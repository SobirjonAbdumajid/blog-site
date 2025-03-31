
import React from 'react';
import Layout from '../components/Layout/Layout';
import PostGrid from '../components/Blog/PostGrid';
import { Link } from 'react-router-dom';

const Index = () => {
  // This data would be injected by Jinja2 from FastAPI backend
  const featuredPosts = [
    {
      id: 1,
      title: 'Getting Started with FastAPI',
      slug: 'getting-started-with-fastapi',
      excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      authorName: 'John Doe',
      publishedAt: '2023-06-15T00:00:00Z',
      categories: [
        { id: 1, name: 'Python', slug: 'python' },
        { id: 2, name: 'Web Development', slug: 'web-development' }
      ]
    },
    {
      id: 2,
      title: 'RESTful API Design Principles',
      slug: 'restful-api-design-principles',
      excerpt: 'Best practices for designing clean and effective REST APIs.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      authorName: 'Jane Smith',
      publishedAt: '2023-06-10T00:00:00Z',
      categories: [
        { id: 2, name: 'Web Development', slug: 'web-development' },
        { id: 3, name: 'API', slug: 'api' }
      ]
    },
    {
      id: 3,
      title: 'Authentication with JWT',
      slug: 'authentication-with-jwt',
      excerpt: 'Implement secure authentication using JSON Web Tokens.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1542903660-eedba2cda473',
      authorName: 'Mike Johnson',
      publishedAt: '2023-06-05T00:00:00Z',
      categories: [
        { id: 4, name: 'Security', slug: 'security' },
        { id: 3, name: 'API', slug: 'api' }
      ]
    },
  ];

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Minimalist Blog</h1>
            <p className="text-xl text-gray-600">Clean, simple, focused content</p>
          </div>
          
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Featured Posts</h2>
              <Link to="/blog" className="text-gray-600 hover:text-gray-900">
                View all posts →
              </Link>
            </div>
            <PostGrid posts={featuredPosts} />
          </div>
        </section>
        
        <section className="bg-gray-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600 mb-6">Get the latest posts delivered straight to your inbox</p>
          
          <form className="flex max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="px-4 py-2 border border-gray-300 rounded-l flex-grow focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
            <button 
              type="submit"
              className="bg-gray-800 text-white px-6 py-2 rounded-r hover:bg-gray-700"
            >
              Subscribe
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
