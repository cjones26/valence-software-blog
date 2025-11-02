import Link from 'next/link';
import { FiHome, FiFileText, FiTag } from 'react-icons/fi';
import PageLayout from '@/components/layout/PageLayout';
import { getPublishedPosts } from '@/lib/posts';

export default function NotFound() {
  const posts = getPublishedPosts();
  const recentPosts = posts.slice(0, 5);

  // Get unique tags from all posts
  const allTags = posts.reduce((tags, post) => {
    post.tags?.forEach((tag) => {
      if (tag && typeof tag === 'string') {
        tags.add(tag);
      }
    });
    return tags;
  }, new Set<string>());

  const popularTags = Array.from(allTags).slice(0, 8);

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Primary Action */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors mb-12"
          >
            <FiHome />
            Go to Homepage
          </Link>

          {/* Recent Posts */}
          <div className="mt-12 text-left">
            <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white mb-4">
              <FiFileText />
              Recent Posts
            </h3>
            <ul className="space-y-3">
              {recentPosts.map((post) => (
                <li key={post.url}>
                  <Link
                    href={post.url}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tags */}
          {popularTags.length > 0 && (
            <div className="mt-12 text-left">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white mb-4">
                <FiTag />
                Browse by Topic
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="px-3 py-1.5 text-sm bg-blue-100 dark:bg-slate-800 text-blue-800 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
