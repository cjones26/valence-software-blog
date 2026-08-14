import { visit } from 'unist-util-visit'
import type { Root, Image } from 'mdast'
import type { VFile } from 'vfile'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

// Contentlayer types this as Record<string, any> upstream.
interface ContentlayerRawDocumentData {
  sourceFilePath?: string
  sourceFileDir?: string
}

declare module 'vfile' {
  interface DataMap {
    rawDocumentData?: ContentlayerRawDocumentData
  }
}

const MAX_WIDTH = 1600

interface ImageTask {
  node: Image
  url: string
  imageSourcePath: string
  publicPath: string
  publicFilePath: string
}

export default function remarkInlineImages() {
  return async (tree: Root, file: VFile) => {
    const tasks: ImageTask[] = []

    visit(tree, 'image', (node: Image) => {
      const url = node.url

      if (url && !url.startsWith('http') && !url.startsWith('/')) {
        const rawDocData = file.data?.rawDocumentData

        if (rawDocData?.sourceFilePath) {
          const pathParts = rawDocData.sourceFilePath.split('/')

          if (pathParts.length >= 2) {
            const year = pathParts[0]
            const slug = pathParts[1]

            const sourceFileDir = rawDocData.sourceFileDir
            const postDir = path.join(process.cwd(), 'content/posts', sourceFileDir ?? '')
            const imageSourcePath = path.resolve(postDir, url)

            const ext = path.extname(url)
            const basename = path.basename(url, ext)
            const publicPath = `/posts/${year}/${slug}/${basename}.webp`
            const publicFilePath = path.join(process.cwd(), 'public', publicPath)

            tasks.push({ node, url, imageSourcePath, publicPath, publicFilePath })
          }
        }
      }
    })

    await Promise.all(
      tasks.map(async ({ node, url, imageSourcePath, publicPath, publicFilePath }) => {
        node.url = publicPath

        if (!fs.existsSync(imageSourcePath)) {
          console.warn(`⚠ Image not found: ${imageSourcePath}`)
          return
        }

        const publicDir = path.dirname(publicFilePath)
        if (!fs.existsSync(publicDir)) {
          fs.mkdirSync(publicDir, { recursive: true })
        }

        try {
          let shouldGenerate = true
          if (fs.existsSync(publicFilePath)) {
            const sourceStat = fs.statSync(imageSourcePath)
            const destStat = fs.statSync(publicFilePath)
            shouldGenerate = sourceStat.mtimeMs > destStat.mtimeMs
          }

          if (shouldGenerate) {
            await sharp(imageSourcePath)
              .resize(MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
              })
              .webp({
                quality: 85,
                effort: 6
              })
              .toFile(publicFilePath)
            console.log(`✓ Optimized inline image: ${publicPath}`)
          }
        } catch (error) {
          console.error(`✗ Failed to process image ${url}:`, error)
        }

        try {
          const { width, height } = await sharp(imageSourcePath).metadata()
          if (width && height) {
            const outputWidth = Math.min(width, MAX_WIDTH)
            const outputHeight = Math.round(height * (outputWidth / width))
            node.data = {
              ...node.data,
              hProperties: {
                ...node.data?.hProperties,
                width: outputWidth,
                height: outputHeight,
              },
            }
          }
        } catch (error) {
          console.error(`✗ Failed to read image dimensions for ${url}:`, error)
        }
      })
    )
  }
}
