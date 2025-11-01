import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import Tag from './Tag';

export interface PostCardProps {
  post: {
    url: string;
    title: string;
    date: string;
    tags: string[];
    description?: string;
    excerpt?: string;
    cover?: string;
    blurDataURL?: string;
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
        <Link href={post.url} className="block mb-3 relative aspect-[2/1] overflow-hidden rounded-lg">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            unoptimized
            priority={false}
            placeholder={post.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={post.blurDataURL}
          />
        </Link>
      )}

      <time
        className="block text-xs font-medium tracking-wider uppercase text-gray-500 dark:text-gray-300 mb-2"
        dateTime={post.date}
      >
        {formattedDate}
      </time>

      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-2 leading-tight">
        <Link
          href={post.url}
          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors no-underline"
        >
          {post.title}
        </Link>
      </h2>

      {post.excerpt && (
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">
          {post.excerpt}
        </p>
      )}

      {validTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {validTags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
