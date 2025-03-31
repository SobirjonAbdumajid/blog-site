import React from 'react';
import { Link } from 'react-router-dom';

interface PostCardProps {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featuredImageUrl?: string;
  authorName: string;
  publishedAt: string;
  categories: Array<{id: number; name: string; slug: string}>;
}

const PostCard = ({
  id,
  title,
  slug,
  excerpt,
  featuredImageUrl,
  authorName,
  publishedAt,
  categories
}: PostCardProps) => {
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {featuredImageUrl && (
        <Link to={`/blog/${slug}`}>
          <img
            src={featuredImageUrl}
            alt={title}
            className="w-full h-48 object-cover"
          />
        </Link>
      )}
      <div className="p-6">
        <div className="flex gap-2 mb-2">
          {categories.slice(0, 2).map(category => (
            <Link
              key={category.id}
              to={`/categories/${category.slug}`}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-2">
          <Link to={`/blog/${slug}`} className="hover:text-gray-700">
            {title}
          </Link>
        </h2>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{authorName}</span>
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;