import { MetadataRoute } from 'next'
import { allPosts } from 'contentlayer/generated'
import { parseDateSafe } from '@/lib/dateUtils'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://valencesoftware.io'

  // Get all published posts
  const publishedPosts = allPosts.filter(post => post.published)

  // Most recent post date - used as lastModified for pages whose content
  // changes when a new post is published, rather than build time
  const postDates = publishedPosts.map(post => parseDateSafe(post.date))
  const mostRecentPostDate = postDates.length
    ? new Date(Math.max(...postDates.map(d => d.getTime())))
    : undefined

  // Most recent post date per tag, for accurate tag-page lastModified
  const tagLastModified = new Map<string, Date>()
  publishedPosts.forEach(post => {
    const postDate = parseDateSafe(post.date)
    post.tags?.forEach(tag => {
      const existing = tagLastModified.get(tag)
      if (!existing || postDate.getTime() > existing.getTime()) {
        tagLastModified.set(tag, postDate)
      }
    })
  })

  // Homepage and static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: mostRecentPostDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: mostRecentPostDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Blog post pages - use actual post dates for accurate SEO signals
  const postPages: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${baseUrl}${post.url}`,
    lastModified: parseDateSafe(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Tag pages - lastModified reflects the newest post carrying that tag
  const tagPages: MetadataRoute.Sitemap = Array.from(tagLastModified.entries()).map(([tag, lastModified]) => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...postPages, ...tagPages]
}
