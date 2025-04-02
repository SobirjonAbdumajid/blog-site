// import React from 'react';
// import Layout from '../components/Layout/Layout';
// import Navbar from '@/components/Layout/Navbar';
// import PostGrid from '../components/Blog/PostGrid';
// import CategoryList from '../components/Blog/CategoryList';
// import TopLikedBlogs from '../components/Blog/TopLikedBlogs';

// const BlogPage = () => {
//   // This data would be injected by Jinja2 from FastAPI backend
//   const posts = [
//     {
//       id: 1,
//       title: 'Getting Started with FastAPI',
//       slug: 'getting-started-with-fastapi',
//       excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
//       authorName: 'John Doe',
//       publishedAt: '2023-06-15T00:00:00Z',
//       categories: [{ id: 1, name: 'Python', slug: 'python' }],
//       likesCount: 120
//     },
//     {
//       id: 2,
//       title: 'RESTful API Design Principles',
//       slug: 'restful-api-design-principles',
//       excerpt: 'Best practices for designing clean and effective REST APIs.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
//       authorName: 'Jane Smith',
//       publishedAt: '2023-06-10T00:00:00Z',
//       categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
//       likesCount: 85
//     },
//     {
//       id: 1,
//       title: 'Getting Started with FastAPI',
//       slug: 'getting-started-with-fastapi',
//       excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
//       authorName: 'John Doe',
//       publishedAt: '2023-06-15T00:00:00Z',
//       categories: [{ id: 1, name: 'Python', slug: 'python' }],
//       likesCount: 120
//     },
//     {
//       id: 2,
//       title: 'RESTful API Design Principles',
//       slug: 'restful-api-design-principles',
//       excerpt: 'Best practices for designing clean and effective REST APIs.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
//       authorName: 'Jane Smith',
//       publishedAt: '2023-06-10T00:00:00Z',
//       categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
//       likesCount: 85
//     },
//     {
//       id: 1,
//       title: 'Getting Started with FastAPI',
//       slug: 'getting-started-with-fastapi',
//       excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
//       authorName: 'John Doe',
//       publishedAt: '2023-06-15T00:00:00Z',
//       categories: [{ id: 1, name: 'Python', slug: 'python' }],
//       likesCount: 120
//     },
//     {
//       id: 2,
//       title: 'RESTful API Design Principles',
//       slug: 'restful-api-design-principles',
//       excerpt: 'Best practices for designing clean and effective REST APIs.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
//       authorName: 'Jane Smith',
//       publishedAt: '2023-06-10T00:00:00Z',
//       categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
//       likesCount: 85
//     },
//     {
//       id: 1,
//       title: 'Getting Started with FastAPI',
//       slug: 'getting-started-with-fastapi',
//       excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
//       authorName: 'John Doe',
//       publishedAt: '2023-06-15T00:00:00Z',
//       categories: [{ id: 1, name: 'Python', slug: 'python' }],
//       likesCount: 120
//     },
//     {
//       id: 2,
//       title: 'RESTful API Design Principles',
//       slug: 'restful-api-design-principles',
//       excerpt: 'Best practices for designing clean and effective REST APIs.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
//       authorName: 'Jane Smith',
//       publishedAt: '2023-06-10T00:00:00Z',
//       categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
//       likesCount: 85
//     },
//     {
//       id: 1,
//       title: 'Getting Started with FastAPI',
//       slug: 'getting-started-with-fastapi',
//       excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
//       authorName: 'John Doe',
//       publishedAt: '2023-06-15T00:00:00Z',
//       categories: [{ id: 1, name: 'Python', slug: 'python' }],
//       likesCount: 120
//     },
//     {
//       id: 2,
//       title: 'RESTful API Design Principles',
//       slug: 'restful-api-design-principles',
//       excerpt: 'Best practices for designing clean and effective REST APIs.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
//       authorName: 'Jane Smith',
//       publishedAt: '2023-06-10T00:00:00Z',
//       categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
//       likesCount: 85
//     },
//     {
//       id: 1,
//       title: 'Getting Started with FastAPI',
//       slug: 'getting-started-with-fastapi',
//       excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
//       authorName: 'John Doe',
//       publishedAt: '2023-06-15T00:00:00Z',
//       categories: [{ id: 1, name: 'Python', slug: 'python' }],
//       likesCount: 120
//     },
//     {
//       id: 2,
//       title: 'RESTful API Design Principles',
//       slug: 'restful-api-design-principles',
//       excerpt: 'Best practices for designing clean and effective REST APIs.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
//       authorName: 'Jane Smith',
//       publishedAt: '2023-06-10T00:00:00Z',
//       categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
//       likesCount: 85
//     },
//     {
//       id: 1,
//       title: 'Getting Started with FastAPI',
//       slug: 'getting-started-with-fastapi',
//       excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
//       authorName: 'John Doe',
//       publishedAt: '2023-06-15T00:00:00Z',
//       categories: [{ id: 1, name: 'Python', slug: 'python' }],
//       likesCount: 120
//     },
//     {
//       id: 2,
//       title: 'RESTful API Design Principles',
//       slug: 'restful-api-design-principles',
//       excerpt: 'Best practices for designing clean and effective REST APIs.',
//       featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
//       authorName: 'Jane Smith',
//       publishedAt: '2023-06-10T00:00:00Z',
//       categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
//       likesCount: 85
//     },
    
//     // More posts...
//   ];
  
//   const categories = [
//     { id: 1, name: 'Web Development', slug: 'web-development', postCount: 12 },
//     { id: 2, name: 'AI & Machine Learning', slug: 'ai-machine-learning', postCount: 8 },
//     { id: 3, name: 'UX/UI Design', slug: 'ux-ui-design', postCount: 5 },
//     { id: 4, name: 'Mobile Development', slug: 'mobile-development', postCount: 3 },
//   ];
  
//   const topLikedBlogs = [
//     {
//       id: 1,
//       title: 'How to Build a REST API with FastAPI',
//       slug: 'how-to-build-rest-api-fastapi',
//       excerpt: 'A comprehensive guide to building RESTful APIs using FastAPI framework',
//       likesCount: 120,
//     },
//     {
//       id: 2,
//       title: '10 UX Principles Every Designer Should Know',
//       slug: '10-ux-principles-every-designer-should-know',
//       excerpt: 'Essential user experience guidelines for creating intuitive interfaces',
//       likesCount: 98,
//     },
//     {
//       id: 3, 
//       title: 'Machine Learning for Beginners: Getting Started',
//       slug: 'machine-learning-for-beginners',
//       excerpt: 'An introduction to ML concepts and practical implementation',
//       likesCount: 87,
//     }
//   ];
  
//   return (
//     <Layout>
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-4">Blog</h1>
//         <p className="text-gray-600">Browse our latest articles and tutorials</p>
//       </div>
      
//       <div className="flex flex-col md:flex-row gap-8">
//         <div className="md:w-2/3">
//           <PostGrid posts={posts} columns={2} />
//         </div>

//         <div className="lg:w-1/3">
//             <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
//               <div className="border border-gray-100 rounded-lg p-6 shadow-sm bg-white">
//                 <h2 className="text-xl font-semibold mb-4">Recommended Topics</h2>
//                 <CategoryList categories={categories} />
//               </div>
              
//               <div className="border border-gray-100 rounded-lg p-6 shadow-sm bg-white">
//                 {/* <h2 className="text-xl font-semibold mb-4">Top-Liked Blogs</h2> */}
//                 <TopLikedBlogs blogs={topLikedBlogs} />
//               </div>
//             </div>
//           </div>
        
//         {/* <div className="md:w-1/3 space-y-6">
//           <div className="border border-gray-100 rounded-lg p-6 shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Recommended Topics</h2>
//             <CategoryList categories={categories} />
//           </div>
          
//           <div className="border border-gray-100 rounded-lg p-6 shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Top-Liked Blogs</h2>
//             <TopLikedBlogs blogs={topLikedBlogs} />
//           </div>
//         </div> */}
//       </div>
//     </Layout>
//   );
// };

// export default BlogPage;

import React from 'react';
import Layout_blog from '@/components/Layout/Layout_blog';
import PostGrid from '../components/Blog/PostGrid';
import CategoryList from '../components/Blog/CategoryList';
import TopLikedBlogs from '../components/Blog/TopLikedBlogs';

const BlogPage = () => {
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
      categories: [{ id: 1, name: 'Python', slug: 'python' }],
      likesCount: 120
    },
    {
      id: 2,
      title: 'RESTful API Design Principles',
      slug: 'restful-api-design-principles',
      excerpt: 'Best practices for designing clean and effective REST APIs.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      authorName: 'Jane Smith',
      publishedAt: '2023-06-10T00:00:00Z',
      categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
      likesCount: 85
    },
    {
      id: 1,
      title: 'Getting Started with FastAPI',
      slug: 'getting-started-with-fastapi',
      excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      authorName: 'John Doe',
      publishedAt: '2023-06-15T00:00:00Z',
      categories: [{ id: 1, name: 'Python', slug: 'python' }],
      likesCount: 120
    },
    {
      id: 2,
      title: 'RESTful API Design Principles',
      slug: 'restful-api-design-principles',
      excerpt: 'Best practices for designing clean and effective REST APIs.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      authorName: 'Jane Smith',
      publishedAt: '2023-06-10T00:00:00Z',
      categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
      likesCount: 85
    },
    {
      id: 1,
      title: 'Getting Started with FastAPI',
      slug: 'getting-started-with-fastapi',
      excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      authorName: 'John Doe',
      publishedAt: '2023-06-15T00:00:00Z',
      categories: [{ id: 1, name: 'Python', slug: 'python' }],
      likesCount: 120
    },
    {
      id: 2,
      title: 'RESTful API Design Principles',
      slug: 'restful-api-design-principles',
      excerpt: 'Best practices for designing clean and effective REST APIs.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      authorName: 'Jane Smith',
      publishedAt: '2023-06-10T00:00:00Z',
      categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
      likesCount: 85
    },
    {
      id: 1,
      title: 'Getting Started with FastAPI',
      slug: 'getting-started-with-fastapi',
      excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      authorName: 'John Doe',
      publishedAt: '2023-06-15T00:00:00Z',
      categories: [{ id: 1, name: 'Python', slug: 'python' }],
      likesCount: 120
    },
    {
      id: 2,
      title: 'RESTful API Design Principles',
      slug: 'restful-api-design-principles',
      excerpt: 'Best practices for designing clean and effective REST APIs.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      authorName: 'Jane Smith',
      publishedAt: '2023-06-10T00:00:00Z',
      categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
      likesCount: 85
    },
    {
      id: 1,
      title: 'Getting Started with FastAPI',
      slug: 'getting-started-with-fastapi',
      excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      authorName: 'John Doe',
      publishedAt: '2023-06-15T00:00:00Z',
      categories: [{ id: 1, name: 'Python', slug: 'python' }],
      likesCount: 120
    },
    {
      id: 2,
      title: 'RESTful API Design Principles',
      slug: 'restful-api-design-principles',
      excerpt: 'Best practices for designing clean and effective REST APIs.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      authorName: 'Jane Smith',
      publishedAt: '2023-06-10T00:00:00Z',
      categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
      likesCount: 85
    },
    {
      id: 1,
      title: 'Getting Started with FastAPI',
      slug: 'getting-started-with-fastapi',
      excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      authorName: 'John Doe',
      publishedAt: '2023-06-15T00:00:00Z',
      categories: [{ id: 1, name: 'Python', slug: 'python' }],
      likesCount: 120
    },
    {
      id: 2,
      title: 'RESTful API Design Principles',
      slug: 'restful-api-design-principles',
      excerpt: 'Best practices for designing clean and effective REST APIs.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      authorName: 'Jane Smith',
      publishedAt: '2023-06-10T00:00:00Z',
      categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
      likesCount: 85
    },
    {
      id: 1,
      title: 'Getting Started with FastAPI',
      slug: 'getting-started-with-fastapi',
      excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      authorName: 'John Doe',
      publishedAt: '2023-06-15T00:00:00Z',
      categories: [{ id: 1, name: 'Python', slug: 'python' }],
      likesCount: 120
    },
    {
      id: 2,
      title: 'RESTful API Design Principles',
      slug: 'restful-api-design-principles',
      excerpt: 'Best practices for designing clean and effective REST APIs.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      authorName: 'Jane Smith',
      publishedAt: '2023-06-10T00:00:00Z',
      categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
      likesCount: 85
    },
    {
      id: 1,
      title: 'Getting Started with FastAPI',
      slug: 'getting-started-with-fastapi',
      excerpt: 'Learn how to build powerful APIs quickly with FastAPI.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
      authorName: 'John Doe',
      publishedAt: '2023-06-15T00:00:00Z',
      categories: [{ id: 1, name: 'Python', slug: 'python' }],
      likesCount: 120
    },
    {
      id: 2,
      title: 'RESTful API Design Principles',
      slug: 'restful-api-design-principles',
      excerpt: 'Best practices for designing clean and effective REST APIs.',
      featuredImageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      authorName: 'Jane Smith',
      publishedAt: '2023-06-10T00:00:00Z',
      categories: [{ id: 2, name: 'Web Development', slug: 'web-development' }],
      likesCount: 85
    },
    
    // More posts...
  ];
  
  const categories = [
    { id: 1, name: 'Web Development', slug: 'web-development', postCount: 12 },
    { id: 2, name: 'AI & Machine Learning', slug: 'ai-machine-learning', postCount: 8 },
    { id: 3, name: 'UX/UI Design', slug: 'ux-ui-design', postCount: 5 },
    { id: 4, name: 'Mobile Development', slug: 'mobile-development', postCount: 3 },
  ];
  
  const topLikedBlogs = [
    {
      id: 1,
      title: 'How to Build a REST API with FastAPI',
      slug: 'how-to-build-rest-api-fastapi',
      excerpt: 'A comprehensive guide to building RESTful APIs using FastAPI framework',
      likesCount: 120,
    },
    {
      id: 2,
      title: '10 UX Principles Every Designer Should Know',
      slug: '10-ux-principles-every-designer-should-know',
      excerpt: 'Essential user experience guidelines for creating intuitive interfaces',
      likesCount: 98,
    },
    {
      id: 3, 
      title: 'Machine Learning for Beginners: Getting Started',
      slug: 'machine-learning-for-beginners',
      excerpt: 'An introduction to ML concepts and practical implementation',
      likesCount: 87,
    }
  ];
  
  return (
    <div>
      {/* <Navbar /> */}
      <Layout_blog>
        <div className="mb-8">
          {/* <h1 className="text-3xl font-bold mb-4">Blog</h1> */}
          <p className="text-gray-600">Browse our latest articles and tutorials</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <PostGrid posts={posts} columns={2} />
          </div>

          <div className="lg:w-1/3">
              <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
                <div className="border border-gray-100 rounded-lg p-6 shadow-sm bg-white">
                  <h2 className="text-xl font-semibold mb-4">Recommended Topics</h2>
                  <CategoryList categories={categories} />
                </div>
                
                <div className="border border-gray-100 rounded-lg p-6 shadow-sm bg-white">
                  <TopLikedBlogs blogs={topLikedBlogs} />
                </div>
              </div>
            </div>
        </div>
      </Layout_blog>
    </div>
  );
};

export default BlogPage;