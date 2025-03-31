
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import TagCloud from '../components/Blog/TagCloud';
import CommentSection from '../components/Blog/CommentSection';
import { Link } from 'react-router-dom';

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // This data would be injected by Jinja2 from FastAPI backend
  const post = {
    id: 1,
    title: 'Getting Started with FastAPI',
    slug: 'getting-started-with-fastapi',
    content: `
      <p>FastAPI is a modern, high-performance web framework for building APIs with Python based on standard type hints.</p>
      <h2>Installation</h2>
      <p>You can install FastAPI with pip:</p>
      <pre><code>pip install fastapi uvicorn</code></pre>
      <h2>Create a Simple API</h2>
      <p>Here's a simple example of a FastAPI application:</p>
      <pre><code>
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
      </code></pre>
      <p>Run it with uvicorn:</p>
      <pre><code>uvicorn main:app --reload</code></pre>
    `,
    featuredImageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    authorName: 'John Doe',
    authorBio: 'Python developer and technical writer',
    authorAvatarUrl: 'https://i.pravatar.cc/150?u=john',
    publishedAt: '2023-06-15T00:00:00Z',
    categories: [
      { id: 1, name: 'Python', slug: 'python' },
      { id: 2, name: 'Web Development', slug: 'web-development' }
    ],
    tags: [
      { id: 1, name: 'fastapi' },
      { id: 2, name: 'python' },
      { id: 3, name: 'web' },
      { id: 4, name: 'api' },
    ],
    viewCount: 1245
  };
  
  const comments = [
    {
      id: 1,
      content: 'Great article! FastAPI is my favorite framework for building APIs.',
      userName: 'Alice',
      createdAt: '2023-06-16T10:30:00Z'
    },
    {
      id: 2,
      content: 'I\'ve been using FastAPI for a few months now and it\'s been amazing.',
      userName: 'Bob',
      createdAt: '2023-06-16T14:15:00Z',
      replies: [
        {
          id: 3,
          content: 'Agreed! The automatic docs are my favorite feature.',
          userName: 'Charlie',
          createdAt: '2023-06-16T15:20:00Z'
        }
      ]
    }
  ];
  
  return (
    <Layout>
      <article className="max-w-3xl mx-auto">
        {post.featuredImageUrl && (
          <img 
            src={post.featuredImageUrl} 
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}
        
        <header className="mb-8">
          <div className="flex gap-2 mb-4">
            {post.categories.map(category => (
              <Link 
                key={category.id} 
                to={`/categories/${category.slug}`}
                className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md"
              >
                {category.name}
              </Link>
            ))}
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              {post.authorAvatarUrl && (
                <img 
                  src={post.authorAvatarUrl} 
                  alt={post.authorName}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span>{post.authorName}</span>
            </div>
            <span>|</span>
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            <span>|</span>
            <span>{post.viewCount} views</span>
          </div>
        </header>
        
        <div 
          className="prose max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <footer className="border-t border-gray-100 pt-6 mt-8">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <TagCloud tags={post.tags} />
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-3">
              {post.authorAvatarUrl && (
                <img 
                  src={post.authorAvatarUrl} 
                  alt={post.authorName}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <h3 className="font-semibold">{post.authorName}</h3>
                <p className="text-sm text-gray-600">{post.authorBio}</p>
              </div>
            </div>
          </div>
        </footer>
        
        <CommentSection comments={comments} postId={post.id} />
      </article>
    </Layout>
  );
};

export default PostDetail;
