
import React from 'react';
import Layout from '../components/Layout/Layout';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';

const CategoriesPage = () => {
  // Categories list with improved design
  const categories = [
    { id: 1, name: 'Web Development', slug: 'web-development', postCount: 12 },
    { id: 2, name: 'JavaScript', slug: 'javascript', postCount: 8 },
    { id: 3, name: 'CSS', slug: 'css', postCount: 5 },
    { id: 4, name: 'Web Design', slug: 'web-design', postCount: 7 },
    { id: 5, name: 'React', slug: 'react', postCount: 6 },
    { id: 6, name: 'Node.js', slug: 'nodejs', postCount: 4 },
    { id: 7, name: 'UI/UX', slug: 'ui-ux', postCount: 3 },
    { id: 8, name: 'Databases', slug: 'databases', postCount: 5 },
  ];
  
  // Popular tags based on the image
  const popularTags = [
    { id: 1, name: 'React' },
    { id: 2, name: 'JavaScript' },
    { id: 3, name: 'CSS' },
    { id: 4, name: 'HTML' },
    { id: 5, name: 'Node.js' },
    { id: 6, name: 'TypeScript' },
    { id: 7, name: 'API' },
    { id: 8, name: 'Frontend' },
    { id: 9, name: 'Backend' },
    { id: 10, name: 'UI/UX' },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main content - Categories */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Categories</h1>
            <p className="text-gray-600 mb-8">
              Browse our articles by category to find the content that interests you most.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories.map(category => (
                <div className="border border-gray-200 rounded-lg p-6" key={category.id}>
                  <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
                  <p className="text-gray-500 mb-4">{category.postCount} articles</p>
                  <Link 
                    to={`/categories/${category.slug}`} 
                    className="text-gray-800 hover:text-gray-600"
                  >
                    View articles →
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="mt-8 md:mt-0">
            {/* Category List */}
            <Card className="p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">All Categories</h2>
              <div className="flex flex-col space-y-2">
                {categories.map(category => (
                  <Link 
                    key={category.id}
                    to={`/categories/${category.slug}`}
                    className="text-gray-700 hover:text-gray-900"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </Card>
            
            {/* Popular Tags */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <Link
                    key={tag.id}
                    to={`/tags/${tag.name.toLowerCase()}`}
                    className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoriesPage;
