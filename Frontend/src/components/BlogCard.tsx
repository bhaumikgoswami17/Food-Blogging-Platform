import React from 'react';
import { Heart, MessageCircle, Share2, Star, Clock, User } from 'lucide-react';

const BlogCard = ({ post, likedPosts, toggleLike }) => (
  <article className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border border-rose-100">
    <div className="relative overflow-hidden">
      <img src={post.image} alt={post.title} className="w-full h-56 object-cover transition-transform duration-300 hover:scale-110" />
      <span className="absolute top-4 left-4 bg-gradient-to-r from-rose-400 to-purple-400 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
        {post.category}
      </span>
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold mb-3 hover:text-rose-600 cursor-pointer text-slate-700">{post.title}</h3>
      <div className="flex items-center text-slate-500 text-sm mb-4">
        <User className="h-4 w-4 mr-1" /><span className="mr-4">{post.author}</span>
        <Clock className="h-4 w-4 mr-1" /><span>{post.time}</span>
      </div>
      <p className="text-slate-600 mb-6 line-clamp-2 leading-relaxed">{post.excerpt}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={() => toggleLike(post.id)} className={`flex items-center space-x-1 ${likedPosts.has(post.id) ? 'text-rose-500' : 'text-slate-500 hover:text-rose-500'}`}>
            <Heart className={`h-5 w-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
            <span className="text-sm">{post.likes}</span>
          </button>
          <span className="flex items-center space-x-1 text-slate-500 hover:text-purple-500">
            <MessageCircle className="h-5 w-5" /><span className="text-sm">{post.comments}</span>
          </span>
          <Share2 className="h-5 w-5 text-slate-500 hover:text-indigo-500" />
        </div>
        <div className="flex items-center text-slate-500 text-sm">
          <Star className="h-4 w-4 mr-1" /><span>{post.readTime}</span>
        </div>
      </div>
    </div>
  </article>
);

export default BlogCard;
