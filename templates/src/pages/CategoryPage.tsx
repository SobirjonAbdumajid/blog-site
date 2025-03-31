
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import PostGrid from '../components/Blog/PostGrid';
import Pagination from '../components/Common/Pagination';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // This data would be injected by Jinja2 from FastAPI backend
  const category = {
    id: 1,
    name: 'Python',
    slug: 'python',
    description: 'Articles about Python programming language, libraries, and best practices.'
  };
  
  const posts = [
    {
      id: 1,
      title: 'Getting Started with FastAPI',
      slug: 'getting-started-with-fastapi',
      excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      authorName: 'John Doe',
      publishedAt: '2023-06-15T00:00:00Z',
      categories: [{ id: 1, name: 'Python', slug: 'python' }]
    },
    // More posts...
  ];
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
      </div>
      
      <PostGrid posts={posts} />
      <Pagination currentPage={1} totalPages={3} baseUrl={`/categories/${category.slug}`} />
    </Layout>
  );
};

export default CategoryPage;
