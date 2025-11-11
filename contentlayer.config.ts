import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import fs from 'fs'
import path from 'path'
import { getPlaiceholder } from 'plaiceholder'
import sharp from 'sharp'
import remarkInlineImages from './lib/remark-inline-images'
import remarkCallouts from './lib/remark-callouts'

/**
 * Parse a date (string or Date object) without timezone issues.
 * Returns an object with year, month (1-12), and day.
 */
function parseDateSafe(date: string | Date): { year: number; month: number; day: number } {
  if (date instanceof Date) {
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate()
    }
  }
  // Handle string in YYYY-MM-DD format
  const [year, month, day] = date.split('T')[0].split('-').map(Number)
  return { year, month, day }
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    published: {
      type: 'boolean',
      default: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    description: {
      type: 'string',
      required: false,
    },
    cover: {
      type: 'string',
      required: false,
    },
  },
  computedFields: {
    coverImage: {
      type: 'string',
      resolve: async (post) => {
        if (!post.cover) return undefined

        // If it's already a public path (starts with /), return as-is
        if (post.cover.startsWith('/')) {
          return post.cover
        }

        // Handle relative paths (./cover.jpg or cover.jpg)
        const postDir = path.dirname(post._raw.sourceFilePath)
        const coverSourcePath = path.join('content/posts', postDir, post.cover)

        // Create public destination path based on post slug
        const pathParts = post._raw.flattenedPath.split('/')
        if (pathParts.length >= 2) {
          const year = pathParts[0]
          const slug = pathParts[1]
          // Always use .webp extension for optimized images
          const publicPath = `/posts/${year}/${slug}/cover.webp`
          const publicFilePath = path.join('public', publicPath)

          // Optimize and convert image to WebP
          try {
            const publicDir = path.dirname(publicFilePath)
            if (!fs.existsSync(publicDir)) {
              fs.mkdirSync(publicDir, { recursive: true })
            }
            if (fs.existsSync(coverSourcePath)) {
              await sharp(coverSourcePath)
                .resize(1200, null, {
                  withoutEnlargement: true,
                  fit: 'inside'
                })
                .webp({
                  quality: 85,
                  effort: 6  // 0-6, higher = better compression but slower
                })
                .toFile(publicFilePath)

              console.log(`Optimized cover image: ${publicPath}`)
            }
          } catch (error) {
            console.error(`Failed to optimize cover image for ${post.title}:`, error)
          }

          return publicPath
        }

        return post.cover
      },
    },
    slug: {
      type: 'string',
      resolve: (post) => {
        // Extract slug from file path
        // e.g., "2022/u32j59x-mac-mouse-lag/index.mdx" -> "2022/10/31/u32j59x-mac-mouse-lag"
        const pathParts = post._raw.flattenedPath.split('/')
        if (pathParts.length >= 2) {
          const year = pathParts[0]
          const slug = pathParts[1]

          // Parse the date safely without timezone issues
          const { month, day } = parseDateSafe(post.date)
          const monthStr = String(month).padStart(2, '0')
          const dayStr = String(day).padStart(2, '0')

          return `${year}/${monthStr}/${dayStr}/${slug}`
        }
        return post._raw.flattenedPath
      },
    },
    url: {
      type: 'string',
      resolve: (post) => {
        const pathParts = post._raw.flattenedPath.split('/')
        if (pathParts.length >= 2) {
          const year = pathParts[0]
          const slug = pathParts[1]

          // Parse the date safely without timezone issues
          const { month, day } = parseDateSafe(post.date)
          const monthStr = String(month).padStart(2, '0')
          const dayStr = String(day).padStart(2, '0')

          return `/${year}/${monthStr}/${dayStr}/${slug}`
        }
        return `/${post._raw.flattenedPath}`
      },
    },
    excerpt: {
      type: 'string',
      resolve: (post) => {
        // Extract first 250 characters from content, stripping markdown
        const content = post.body.raw
        const text = content
          .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
          .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
          .replace(/[#*`_~]/g, '') // Remove markdown syntax
          .replace(/\n+/g, ' ') // Replace newlines with spaces
          .trim()
        return text.substring(0, 250) + (text.length > 250 ? '...' : '')
      },
    },
    blurDataURL: {
      type: 'string',
      resolve: async (post) => {
        if (!post.cover) return undefined

        try {
          // Determine the source path of the cover image
          let imagePath: string

          if (post.cover.startsWith('/')) {
            // Public path - read from public folder
            imagePath = path.join('public', post.cover)
          } else {
            // Relative path - read from content folder
            const postDir = path.dirname(post._raw.sourceFilePath)
            imagePath = path.join('content/posts', postDir, post.cover)
          }

          if (!fs.existsSync(imagePath)) {
            console.warn(`Cover image not found: ${imagePath}`)
            return undefined
          }

          const buffer = fs.readFileSync(imagePath)
          const { base64 } = await getPlaiceholder(buffer, { size: 10 })
          return base64
        } catch (error) {
          console.error(`Failed to generate blur placeholder for ${post.title}:`, error)
          return undefined
        }
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'content/posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [
      remarkGfm,
      remarkInlineImages,
      remarkDirective,
      remarkCallouts,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark',
            light: 'github-light',
          },
          keepBackground: true,
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})
