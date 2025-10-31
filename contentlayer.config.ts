import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkGfm from 'remark-gfm'

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
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => {
        // Extract slug from file path
        // e.g., "2022/u32j59x-mac-mouse-lag/index.mdx" -> "2022/10/31/u32j59x-mac-mouse-lag"
        const pathParts = post._raw.flattenedPath.split('/')
        if (pathParts.length >= 2) {
          const year = pathParts[0]
          const slug = pathParts[1]

          // Get the date to extract month and day
          const date = new Date(post.date)
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const day = String(date.getDate()).padStart(2, '0')

          return `${year}/${month}/${day}/${slug}`
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

          const date = new Date(post.date)
          const month = String(date.getMonth() + 1).padStart(2, '0')
          const day = String(date.getDate()).padStart(2, '0')

          return `/${year}/${month}/${day}/${slug}`
        }
        return `/${post._raw.flattenedPath}`
      },
    },
  },
}))

export default makeSource({
  contentDirPath: 'content/posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark',
            light: 'github-light',
          },
          keepBackground: false,
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
