import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import Comments from '@/components/Comments';
import MDXContent from '@/components/MDXContent';

interface PostPageProps {
  params: Promise<{
    year: string;
    month: string;
    day: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => {
    const [year, month, day, slug] = post.slug.split('/');
    return { year, month, day, slug };
  });
}

export async function generateMetadata({ params }: PostPageProps) {
  const { year, month, day, slug } = await params;
  const post = allPosts.find((post) => post.slug === `${year}/${month}/${day}/${slug}`);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description || `Blog post: ${post.title}`,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { year, month, day, slug } = await params;
  const post = allPosts.find((post) => post.slug === `${year}/${month}/${day}/${slug}`);

  if (!post) {
    notFound();
  }

  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy');

  return (
    <Layout layoutSource="post" postTitle={post.title} postDate={formattedDate}>
      <article className="prose dark:prose-invert max-w-none">
        <MDXContent code={post.body.code} />
      </article>
      <Comments />
    </Layout>
  );
}
