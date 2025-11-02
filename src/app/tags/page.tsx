import { allPosts } from 'contentlayer/generated';
import PageLayout from '@/components/layout/PageLayout';
import Tag from '@/components/blog/Tag';

export const metadata = {
  title: 'All Tags',
  description: 'Browse all tags used in blog posts',
};

export default function TagsPage() {
  const tagCounts = new Map<string, number>();

  allPosts.forEach((post) => {
    if (post.published) {
      post.tags?.forEach((tag) => {
        if (tag && typeof tag === 'string') {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
        }
      });
    }
  });

  const sortedTags = Array.from(tagCounts.entries())
    .filter(([tag]) => tag && typeof tag === 'string')
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count, slug: tag.toLowerCase().replace(/\s+/g, '-') }));

  return (
    <PageLayout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">All Tags</h2>
        <p className="text-muted-foreground">{sortedTags.length} tags found</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {sortedTags.map(({ tag, count }) => (
          <Tag key={tag} tag={tag} count={count} />
        ))}
      </div>
    </PageLayout>
  );
}
