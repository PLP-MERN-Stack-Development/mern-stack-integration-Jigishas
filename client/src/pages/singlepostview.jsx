import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const SinglePostView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPost(data.post || data); // Assuming your API returns { success: true, post: {...} } or just the post
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) return <div className="text-center py-8">Loading post...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;
  if (!post) return <div className="text-center py-8">No post found</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
          ← Back to Posts
        </Link>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.featuredImage && (
          <img src={post.featuredImage} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" />
        )}
        {post.excerpt && <p className="text-lg text-gray-600 mb-6 italic">{post.excerpt}</p>}
        <div className="prose max-w-none mb-6">
          <p>{post.content}</p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
          <span>By {post.author?.name || 'Unknown'}</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        )}
        {post.category && (
          <div className="mt-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Category: {post.category.name || post.category}
            </span>
          </div>
        )}
        {post.comments && post.comments.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            <div className="space-y-4">
              {post.comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800">{comment.content}</p>
                  <small className="text-gray-500">
                    By {comment.user?.name || 'Anonymous'} on {new Date(comment.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePostView;
