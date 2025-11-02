import { Post } from 'contentlayer/generated';

interface BlogPostingSchemaProps {
  post: Post;
}

export function BlogPostingSchema({ post }: BlogPostingSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description || post.excerpt,
    image: post.coverImage
      ? `https://valencesoftware.io${post.coverImage}`
      : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Charles Jones',
      url: 'https://valencesoftware.io/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Valence Software',
      url: 'https://valencesoftware.io',
    },
    keywords: post.tags?.join(', '),
    url: `https://valencesoftware.io${post.url}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://valencesoftware.io${post.url}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Valence Software',
    description:
      'A software engineering blog covering practical programming tutorials, systems architecture, and real-world solutions for working engineers.',
    url: 'https://valencesoftware.io',
    author: {
      '@type': 'Person',
      name: 'Charles Jones',
      url: 'https://valencesoftware.io/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Valence Software',
      url: 'https://valencesoftware.io',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://valencesoftware.io${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
