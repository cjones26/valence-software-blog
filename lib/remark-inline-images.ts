import { visit } from 'unist-util-visit'
import type { Root } from 'mdast'
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

export default function remarkInlineImages() {
  return async (tree: Root, file: any) => {
    const images: Array<{ node: any; newUrl: string }> = []

    visit(tree, 'image', (node: any) => {
      const url = node.url as string

      if (url && !url.startsWith('http') && !url.startsWith('/')) {
        const rawDocData = file.data?.rawDocumentData

        if (rawDocData?.sourceFilePath) {
          const pathParts = rawDocData.sourceFilePath.split('/')

          if (pathParts.length >= 2) {
            const year = pathParts[0]
            const slug = pathParts[1]

            const sourceFileDir = rawDocData.sourceFileDir
            const postDir = path.join(process.cwd(), 'content/posts', sourceFileDir)
            const imageSourcePath = path.resolve(postDir, url)

            const ext = path.extname(url)
            const basename = path.basename(url, ext)
            const publicPath = `/posts/${year}/${slug}/${basename}.webp`

            images.push({ node, newUrl: publicPath })

            const publicFilePath = path.join(process.cwd(), 'public', publicPath)
            const publicDir = path.dirname(publicFilePath)

            if (!fs.existsSync(publicDir)) {
              fs.mkdirSync(publicDir, { recursive: true })
            }

            if (fs.existsSync(imageSourcePath)) {
              try {
                let shouldGenerate = true
                if (fs.existsSync(publicFilePath)) {
                  const sourceStat = fs.statSync(imageSourcePath)
                  const destStat = fs.statSync(publicFilePath)
                  shouldGenerate = sourceStat.mtimeMs > destStat.mtimeMs
                }

                if (shouldGenerate) {
                  sharp(imageSourcePath)
                    .resize(1600, null, {
                      withoutEnlargement: true,
                      fit: 'inside'
                    })
                    .webp({
                      quality: 85,
                      effort: 6
                    })
                    .toFile(publicFilePath)
                    .then(() => {
                      console.log(`✓ Optimized inline image: ${publicPath}`)
                    })
                    .catch((error: Error) => {
                      console.error(`✗ Failed to optimize image ${url}:`, error.message)
                    })
                }
              } catch (error) {
                console.error(`✗ Failed to process image ${url}:`, error)
              }
            } else {
              console.warn(`⚠ Image not found: ${imageSourcePath}`)
            }
          }
        }
      }
    })

    // Update all image URLs
    images.forEach(({ node, newUrl }) => {
      node.url = newUrl
    })
  }
}
