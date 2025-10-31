import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';

export interface PostCardProps {
  post: {
    url: string;
    title: string;
    date: string;
    tags: string[];
    description?: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const formattedDate = format(new Date(post.date), 'MMMM d, yyyy').toUpperCase();
  const validTags = post.tags.filter((tag): tag is string => Boolean(tag && typeof tag === 'string'));

  return (
    <div className="mb-5">
      <div className="mb-3">{formattedDate}</div>
      <div className="flex justify-between">
        <h3 className="mt-0">
          <Link href={post.url}>{post.title}</Link>
        </h3>
      </div>
      {post.description && <p className="my-1">{post.description}</p>}
      {validTags.length > 0 && (
        <div className="mt-2">
          <strong>Tags: </strong>
          <ul className="inline-block p-0 mt-0 mb-0 list-none">
            {validTags.map((tag, index) => (
              <React.Fragment key={tag}>
                {index > 0 && <span>, </span>}
                <li className="inline italic">
                  <Link href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}>{tag}</Link>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
