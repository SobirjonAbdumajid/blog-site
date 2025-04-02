
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart } from 'lucide-react';

interface Comment {
  id: number;
  content: string;
  userName: string;
  userAvatar?: string;
  createdAt: string;
  replies?: Comment[];
}

interface CommentSectionProps {
  comments: Comment[];
  postId: number;
}

const CommentItem = ({ comment }: { comment: Comment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  
  const formattedDate = new Date(comment.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting reply:', replyContent);
    setReplyContent('');
    setShowReply(false);
  };
  
  return (
    <div className="py-6 first:pt-2">
      <div className="flex gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.userAvatar} alt={comment.userName} />
          <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{comment.userName}</span>
            <span className="text-sm text-gray-500">{formattedDate}</span>
          </div>
          
          <div className="text-gray-800 mb-2">
            {comment.content}
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <button 
              onClick={() => setIsLiked(!isLiked)} 
              className={`flex items-center gap-1 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Heart size={16} className={isLiked ? "fill-red-500" : ""} />
              <span>Like</span>
            </button>
            <button 
              onClick={() => setShowReply(!showReply)} 
              className="hover:text-gray-700"
            >
              Reply
            </button>
          </div>
          
          {showReply && (
            <form onSubmit={handleReplySubmit} className="mt-3">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="min-h-[80px] mb-2"
              />
              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowReply(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={!replyContent.trim()}
                >
                  Reply
                </Button>
              </div>
            </form>
          )}
          
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 pl-6 border-l border-gray-100">
              {comment.replies.map(reply => (
                <CommentItem key={reply.id} comment={reply} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CommentSection = ({ comments, postId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState('');
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit comment to backend
    console.log('Submitting comment:', newComment);
    setNewComment('');
  };
  
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-xl font-bold mb-6">Responses ({comments.length})</h3>
      
      <div className="flex gap-3 mb-8">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://i.pravatar.cc/150?u=user" alt="Your avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        
        <form onSubmit={handleSubmit} className="flex-1">
          <Textarea
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
              if (!isToolbarVisible && e.target.value) {
                setIsToolbarVisible(true);
              }
            }}
            placeholder="What are your thoughts?"
            className="min-h-[100px] mb-2 focus:ring-0"
            onFocus={() => setIsToolbarVisible(true)}
          />
          
          {isToolbarVisible && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  <span className="font-bold">B</span>
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  <span className="italic">I</span>
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="publish-profile"
                    className="mr-2"
                  />
                  <label htmlFor="publish-profile" className="text-sm text-gray-600">
                    Also publish to my profile
                  </label>
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full"
                  onClick={() => {
                    setNewComment('');
                    setIsToolbarVisible(false);
                  }}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  className="rounded-full"
                  disabled={!newComment.trim()}
                >
                  Respond
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
      
      <div className="border-t border-gray-100">
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
