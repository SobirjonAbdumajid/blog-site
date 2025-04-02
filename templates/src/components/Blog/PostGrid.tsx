
import React from 'react';
import PostCard from './PostCard';

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImageUrl?: string;
  authorName: string;
  publishedAt: string;
  categories: Array<{id: number; name: string; slug: string}>;
  likesCount?: number;
}

interface PostGridProps {
  posts: Post[];
  columns?: number;
}

const PostGrid = ({ posts, columns = 3 }: PostGridProps) => {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }[columns] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid ${gridCols} gap-6`}>
      {posts.map(post => (
        <PostCard 
          key={post.id}
          id={post.id}
          title={post.title}
          slug={post.slug}
          excerpt={post.excerpt || ''}
          featuredImageUrl={post.featuredImageUrl}
          authorName={post.authorName}
          publishedAt={post.publishedAt}
          categories={post.categories}
          likesCount={post.likesCount}
        />
      ))}
    </div>
  );
};

export default PostGrid;
