
import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  slug: string;
  postCount?: number;
}

interface CategoryListProps {
  categories: Category[];
}

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map(category => (
        <Link
          key={category.id}
          to={`/categories/${category.slug}`}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
        >
          {category.name}
          {category.postCount !== undefined && (
            <span className="ml-1 text-gray-500">({category.postCount})</span>
          )}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
