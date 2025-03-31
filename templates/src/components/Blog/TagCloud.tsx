
import React from 'react';
import { Link } from 'react-router-dom';

interface Tag {
  id: number;
  name: string;
}

interface TagCloudProps {
  tags: Tag[];
}

const TagCloud = ({ tags }: TagCloudProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Link
          key={tag.id}
          to={`/tags/${tag.name}`}
          className="px-3 py-1 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-xs"
        >
          #{tag.name}
        </Link>
      ))}
    </div>
  );
};

export default TagCloud;
