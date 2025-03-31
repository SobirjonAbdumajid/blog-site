
import React from 'react';
import Layout from '../components/Layout/Layout';
import PostGrid from '../components/Blog/PostGrid';
import CategoryList from '../components/Blog/CategoryList';
import Pagination from '../components/Common/Pagination';
import { useSearchParams } from 'react-router-dom';

const BlogPage = () => {
  // URL params for filtering and pagination would be handled by FastAPI
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  
  // This data would be injected by Jinja2 from FastAPI backend
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
    {
      id: 2,
      title: 'RESTful API Design Principles',
      slug: 'restful-api-design-principles',
      excerpt: 'Best practices for designing clean and effective REST APIs.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      authorName: 'Jane Smith',
      publishedAt: '2023-06-10T00:00:00Z',
      categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }]
    },
    {
      id: 3,
      title: 'RESTful API Design Principles',
      slug: 'restful-api-design-principles',
      excerpt: 'Best practices for designing clean and effective REST APIs.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      authorName: 'Jane Smith',
      publishedAt: '2023-06-10T00:00:00Z',
      categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }]
    },
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
    {
      id: 2,
      title: 'RESTful API Design Principles',
      slug: 'restful-api-design-principles',
      excerpt: 'Best practices for designing clean and effective REST APIs.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      authorName: 'Jane Smith',
      publishedAt: '2023-06-10T00:00:00Z',
      categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }]
    },
    {
      id: 2,
      title: 'RESTful API Design Principles',
      slug: 'restful-api-design-principles',
      excerpt: 'Best practices for designing clean and effective REST APIs.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      authorName: 'Jane Smith',
      publishedAt: '2023-06-10T00:00:00Z',
      categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }]
    },
    // More posts...
  ];
  
  const categories = [
    { id: 1, name: 'Python', slug: 'python', postCount: 12 },
    { id: 2, name: 'Web Development', slug: 'web-development', postCount: 8 },
    { id: 3, name: 'API', slug: 'api', postCount: 5 },
    { id: 4, name: 'Security', slug: 'security', postCount: 3 },
  ];
  
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Blog</h1>
        <p className="text-gray-600">Browse our latest articles and tutorials</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <PostGrid posts={posts} />
          <Pagination currentPage={page} totalPages={5} baseUrl="/blog" />
        </div>
        
        <div className="md:w-1/3">
          <div className="border border-gray-100 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <CategoryList categories={categories} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
