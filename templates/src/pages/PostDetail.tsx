
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import CommentSection from '../components/Blog/CommentSection';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, Bookmark, Share2, MoreHorizontal } from 'lucide-react';

const PostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
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
    readingTime: '5 min read',
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
      userAvatar: 'https://i.pravatar.cc/150?u=alice',
      createdAt: '2023-06-16T10:30:00Z'
    },
    {
      id: 2,
      content: 'I\'ve been using FastAPI for a few months now and it\'s been amazing.',
      userName: 'Bob',
      userAvatar: 'https://i.pravatar.cc/150?u=bob',
      createdAt: '2023-06-16T14:15:00Z',
      replies: [
        {
          id: 3,
          content: 'Agreed! The automatic docs are my favorite feature.',
          userName: 'Charlie',
          userAvatar: 'https://i.pravatar.cc/150?u=charlie',
          createdAt: '2023-06-16T15:20:00Z'
        }
      ]
    }
  ];

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  
  return (
    <Layout>
      <article className="max-w-2xl mx-auto px-4">
        <header className="mt-8 mb-8">
          <div className="flex gap-2 mb-4">
            {post.categories.map(category => (
              <Link 
                key={category.id} 
                to={`/categories/${category.slug}`}
              >
                <Badge variant="outline" className="text-xs font-normal">
                  #{category.name}
                </Badge>
              </Link>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.authorAvatarUrl} alt={post.authorName} />
                <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">{post.authorName}</span>
                  <span className="text-gray-500">·</span>
                  <button className="text-green-600 text-sm font-medium">Follow</button>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <span>{formattedDate}</span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsLiked(!isLiked)} 
                className={`${isLiked ? 'text-red-500' : 'text-gray-500'}`}
              >
                <Heart size={20} className={isLiked ? "fill-red-500" : ""} />
              </button>
              <button 
                onClick={() => setIsBookmarked(!isBookmarked)} 
                className={`${isBookmarked ? 'text-gray-900' : 'text-gray-500'}`}
              >
                <Bookmark size={20} className={isBookmarked ? "fill-gray-900" : ""} />
              </button>
              <button className="text-gray-500">
                <Share2 size={20} />
              </button>
              <button className="text-gray-500">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>
        </header>
        
        {post.featuredImageUrl && (
          <div className="mb-8">
            <img 
              src={post.featuredImageUrl} 
              alt={post.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        )}
        
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <div className="border-t border-gray-100 pt-6 mb-12">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <button 
                onClick={() => setIsLiked(!isLiked)} 
                className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
              >
                <Heart size={20} className={isLiked ? "fill-red-500" : ""} />
                <span className="text-sm">Like</span>
              </button>
              <button className="flex items-center gap-1 text-gray-500">
                <Share2 size={20} />
                <span className="text-sm">Share</span>
              </button>
            </div>
            <button 
              onClick={() => setIsBookmarked(!isBookmarked)} 
              className={`flex items-center gap-1 ${isBookmarked ? 'text-gray-900' : 'text-gray-500'}`}
            >
              <Bookmark size={20} className={isBookmarked ? "fill-gray-900" : ""} />
              <span className="text-sm">Save</span>
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center gap-4">
              {post.authorAvatarUrl && (
                <Avatar className="h-12 w-12">
                  <AvatarImage 
                    src={post.authorAvatarUrl} 
                    alt={post.authorName}
                  />
                  <AvatarFallback>{post.authorName.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{post.authorName}</h3>
                  <button className="bg-green-600 text-white text-sm px-3 py-0.5 rounded-full">Follow</button>
                </div>
                <p className="text-sm text-gray-600">{post.authorBio}</p>
              </div>
            </div>
          </div>
        </div>
        
        <CommentSection comments={comments} postId={post.id} />
      </article>
    </Layout>
  );
};

export default PostDetail;
