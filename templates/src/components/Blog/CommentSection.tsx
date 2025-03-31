
import React, { useState } from 'react';

interface Comment {
  id: number;
  content: string;
  userName: string;
  createdAt: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  comments: Comment[];
  postId: number;
}

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div className="border-b border-gray-100 py-4">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{comment.userName}</span>
        <span className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
      </div>
      <p className="text-gray-700">{comment.content}</p>
      
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-6 mt-4 border-l-2 border-gray-100 pl-4">
          {comment.replies.map(reply => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

const CommentSection = ({ comments, postId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit comment to backend
    console.log('Submitting comment:', newComment);
    setNewComment('');
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-6">Comments ({comments.length})</h3>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full border border-gray-300 rounded p-3 h-32 focus:outline-none focus:ring-1 focus:ring-gray-400"
          placeholder="Leave a comment..."
          required
        />
        <div className="mt-2 flex justify-end">
          <button 
            type="submit" 
            className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Post Comment
          </button>
        </div>
      </form>
      
      <div className="space-y-2">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
