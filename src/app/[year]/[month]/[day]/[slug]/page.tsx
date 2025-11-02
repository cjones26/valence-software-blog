import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { format } from 'date-fns';
import PageLayout from '@/components/layout/PageLayout';
import Comments from '@/components/ui/Comments';
import MDXContent from '@/components/mdx/MDXContent';
import Tag from '@/components/blog/Tag';
import PostCoverImage from '@/components/blog/PostCoverImage';
import { BlogPostingSchema, BreadcrumbSchema } from '@/components/analytics/StructuredData';

interface PostPageProps {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { year, month, day, slug } = await params;
  const post = allPosts.find(
    (post) => post.slug === `${year}/${month}/${day}/${slug}`
  );

  if (!post) {
    notFound();
  }

  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy');
  const validTags = (post.tags || []).filter((tag): tag is string =>
    Boolean(tag && typeof tag === 'string')
  );

  return (
    <PageLayout>
      <BlogPostingSchema post={post} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: post.title, url: post.url },
        ]}
      />

      {post.coverImage && (
        <PostCoverImage
          src={post.coverImage}
          alt={post.title}
          blurDataURL={post.blurDataURL}
        />
      )}

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 leading-tight text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          {formattedDate}
        </p>
        {validTags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {validTags.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        )}
      </div>

      <article className="prose dark:prose-invert">
        <MDXContent code={post.body.code} />
      </article>
      <section
        className="mt-12 pt-8 border-t border-blue-200 dark:border-slate-700"
        aria-label="Comments"
      >
        <Comments />
      </section>
    </PageLayout>
  );
}

export async function generateStaticParams() {
  return allPosts.map((post) => {
    const [year, month, day, slug] = post.slug.split('/');
    return { year, month, day, slug };
  });
}

export async function generateMetadata({ params }: PostPageProps) {
  const { year, month, day, slug } = await params;
  const post = allPosts.find(
    (post) => post.slug === `${year}/${month}/${day}/${slug}`
  );

  if (!post) {
    return {};
  }

  const url = `https://valencesoftware.io${post.url}`;

  // Generate a better description fallback if none exists
  const description = post.description ||
    post.excerpt ||
    `Read about ${post.title} - a software engineering blog post covering practical programming insights and solutions.`;

  // Use cover image for OG/Twitter if available
  const images = post.coverImage
    ? [
        {
          url: `https://valencesoftware.io${post.coverImage}`,
          alt: post.title,
        },
      ]
    : [];

  return {
    title: post.title,
    description,
    keywords: post.tags || [],
    authors: [{ name: 'Charles Jones' }],
    alternates: {
      canonical: post.url,
    },
    openGraph: {
      type: 'article',
      url,
      title: post.title,
      description,
      images,
      publishedTime: post.date,
      authors: ['Charles Jones'],
      tags: post.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images,
    },
  };
}
