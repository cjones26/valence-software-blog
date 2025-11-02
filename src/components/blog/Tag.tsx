import Link from 'next/link';

export interface TagProps {
  tag: string;
  count?: number;
}

export default function Tag({ tag, count }: TagProps) {
  const slug = tag.toLowerCase().replace(/\s+/g, '-');

  return (
    <Link
      href={`/tags/${slug}`}
      className="inline-block no-underline px-3 py-1.5 text-xs font-medium text-white bg-gray-600 dark:bg-gray-600 hover:bg-blue-600 dark:hover:bg-blue-500 rounded-md transition-colors duration-200 shadow-sm"
    >
      {tag}
      {count !== undefined && (
        <span className="ml-1.5 px-1.5 py-0.5 bg-black/15 dark:bg-white/20 rounded-full text-[10px] transition-colors duration-200">
          {count}
        </span>
      )}
    </Link>
  );
}
