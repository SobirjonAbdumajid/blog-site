
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Heart } from 'lucide-react';

interface PostCardProps {
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

const PostCard = ({ 
  id, 
  title, 
  slug, 
  excerpt, 
  featuredImageUrl, 
  authorName, 
  publishedAt,
  categories,
  likesCount = 0
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
            >
              <Badge variant="outline" className="text-xs">
                #{category.name}
              </Badge>
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
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Heart 
                size={16} 
                className={`mr-1 ${likesCount > 0 ? 'text-red-500 fill-red-500' : ''}`} 
              />
              <span>{likesCount} likes</span>
            </div>
            <span>{new Date(publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
