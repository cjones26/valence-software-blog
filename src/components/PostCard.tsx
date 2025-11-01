import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';

export interface PostCardProps {
  post: {
    url: string;
    title: string;
    date: string;
    tags: string[];
    description?: string;
    excerpt?: string;
    cover?: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy');
  const validTags = post.tags.filter((tag): tag is string =>
    Boolean(tag && typeof tag === 'string')
  );

  return (
    <article className="mb-0">
      {post.cover && (
        <Link href={post.url} className="block mb-3">
          <Image
            src={post.cover}
            alt={post.title}
            width={1200}
            height={630}
            className="w-full h-auto rounded-lg hover:opacity-90 transition-opacity"
            unoptimized
            priority={false}
          />
        </Link>
      )}

      <time
        className="block text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400 mb-2"
        dateTime={post.date}
      >
        {formattedDate}
      </time>

      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 leading-tight">
        <Link
          href={post.url}
          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-cyan-400 transition-colors no-underline"
        >
          {post.title}
        </Link>
      </h2>

      {post.excerpt && (
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
          {post.excerpt}
        </p>
      )}

      {validTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {validTags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-block px-3 py-1.5 text-xs font-medium text-white bg-gray-600 dark:bg-gray-700 rounded-md hover:bg-blue-600 dark:hover:bg-cyan-600 transition-all shadow-sm"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
