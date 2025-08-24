import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams(); // grab id from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setError("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center py-10">Loading blog...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;
  if (!blog) return <p className="text-center py-10">Blog not found.</p>;

  return (
    <article className="max-w-4xl mx-auto py-20 px-6 bg-white shadow-lg rounded-2xl">
      <img
        src={blog.imageUrl || "https://dummyimage.com/800x400/000/fff"}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-lg mb-6"
      />
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      {blog.subtitle && <h2 className="text-xl text-gray-600 mb-4">{blog.subtitle}</h2>}

      <div className="flex justify-between text-sm text-gray-500 mb-6">
        <span>By {blog.author || "Unknown"}</span>
        <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="prose prose-lg max-w-none">
        <p>{blog.content}</p>
        {blog.ingredients?.length > 0 && (
          <>
            <h3>Ingredients</h3>
            <ul>
              {blog.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </>
        )}

        {blog.instructions?.length > 0 && (
          <>
            <h3>Instructions</h3>
            <ol>
              {blog.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </>
        )}
      </div>

      <Link
        to="/"
        className="inline-block mt-8 bg-orange-500 text-white px-5 py-2 rounded-full shadow hover:bg-orange-600 transition"
      >
        ← Back to Blogs
      </Link>
    </article>
  );
};

export default BlogDetail;
