import { MetadataRoute } from 'next'
import { allPosts } from 'contentlayer/generated'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://valencesoftware.io'

  // Get all published posts
  const publishedPosts = allPosts.filter(post => post.published)

  // Get all unique tags from published posts
  const allTags = publishedPosts.reduce((tags, post) => {
    post.tags?.forEach(tag => tags.add(tag))
    return tags
  }, new Set<string>())

  // Homepage and static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // Blog post pages
  const postPages: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
    url: `${baseUrl}${post.url}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Tag pages
  const tagPages: MetadataRoute.Sitemap = Array.from(allTags).map((tag) => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...postPages, ...tagPages]
}
