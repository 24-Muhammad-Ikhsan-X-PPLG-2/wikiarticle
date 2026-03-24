"use client";

import { Send } from "lucide-react";
import { FC, useState } from "react";

type Comment = {
  id: number;
  author: string;
  avatar: string;
  timestamp: string;
  text: string;
};

type Props = {
  comments?: Comment[];
};

const CommentSection: FC<Props> = ({ comments = [] }) => {
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState<Comment[]>(comments);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: allComments.length + 1,
        author: "You",
        avatar: "👤",
        timestamp: "just now",
        text: newComment,
      };
      setAllComments([comment, ...allComments]);
      setNewComment("");
    }
  };
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Discussion
      </h3>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Add your thoughts
          </label>
          <div className="flex gap-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your perspective..."
              rows={3}
              className="grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all duration-300"
            />
          </div>
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Post
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {allComments.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          allComments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-lg text-white">
                {comment.avatar}
              </div>
              <div className="grow">
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {comment.author}
                  </h4>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                  {comment.text}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
