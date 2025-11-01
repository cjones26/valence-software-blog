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
    <Layout>
      <article className="prose dark:prose-invert">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-3 leading-tight text-gray-900 dark:text-white m-0">
            {post.title}
          </h1>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 m-0">{formattedDate}</p>
        </div>
        <MDXContent code={post.body.code} />
      </article>
      <section className="mt-12 pt-8 border-t border-blue-200 dark:border-slate-700" aria-label="Comments">
        <Comments />
      </section>
    </Layout>
  );
}
