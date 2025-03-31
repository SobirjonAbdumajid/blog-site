
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
}

interface PostGridProps {
  posts: Post[];
}

const PostGrid = ({ posts }: PostGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        />
      ))}
    </div>
  );
};

export default PostGrid;
