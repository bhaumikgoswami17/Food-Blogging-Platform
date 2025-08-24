import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Users, Star, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const BlogList = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    if (blogs.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 100, scale: 0.9, rotationX: 15, rotationY: 15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: "power3.out",
        }
      );
    });
  }, [blogs]);

  const handleDelete = (id) => {
  toast.custom(
    (t) => (
      <div
        className={`bg-white shadow-lg rounded-lg p-5 w-80 text-center 
        transition-all duration-300 
        ${t.visible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      >
        <p className="text-gray-800 mb-4 font-medium">
          Are you sure you want to delete this blog?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => {
              axios
                .delete(`http://localhost:5000/api/blogs/${id}`)
                .then(() => {
                  setBlogs((prev) => prev.filter((blog) => blog._id !== id));
                  toast.success("Blog deleted successfully!");
                })
                .catch(() => {
                  toast.error("Failed to delete blog.");
                })
                .finally(() => toast.dismiss(t.id));
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    ),
    { position: "top-center" } // ✅ Center of screen
  );
};

  if (loading) return <p className="text-center py-10">Loading blogs...</p>;
  if (error) return <p className="text-center py-10 text-red-500">{error}</p>;

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl lg:text-5xl font-bold text-gray-900"
          >
            Latest <span className="text-orange-500">Blogs</span>
          </h2>
          <Link
            to="/create-blog"
            className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-orange-600 transition-colors duration-300"
          >
            <Plus className="w-5 h-5" />
            Create Blog
          </Link>
        </div>

        {/* Blog cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <article
              key={blog._id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group transform transition hover:scale-105 hover:shadow-2xl border border-gray-200 relative"
            >
              {/* Delete button */}
              <button
    onClick={() => {
    console.log("Deleting blog ID:", blog._id); // ✅ Debug
    handleDelete(blog._id);
  }}
  className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full shadow 
             hover:bg-red-600 transition-all duration-300 z-10 
             opacity-0 group-hover:opacity-100"
>
  <X size={16} />
</button>

              <div className="relative overflow-hidden">
                <img
                  src={blog.imageUrl || "https://dummyimage.com/400x300/000/fff"}
                  alt={blog.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{blog.rating || 0}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.subtitle?.slice(0, 120) || blog.content?.slice(0, 120)}...
                </p>
<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
  <div className="flex flex-wrap items-center gap-4">
    {/* Reading time */}
    {/* <div className="flex items-center space-x-1">
      <Clock size={16} />
      <span>{blog.readTime || "N/A"}</span>
    </div> */}

    {/* Servings */}
    <div className="flex items-center space-x-1">
      <Users size={16} />
      <span>{blog.servings ? `${blog.servings} servings` : "N/A"}</span>
    </div>

    {/* Cooking time */}
    <div className="flex items-center space-x-1">
      <Clock size={16} className="text-orange-500" />
      <span>{blog.cookingTime ? `${blog.cookingTime} mins` : "N/A"}</span>
    </div>
  </div>

  <span className="font-medium text-gray-700">
    by {blog.author || "Unknown"}
  </span>
</div>

                <Link
                  to={`/blog/${blog._id}`}
                  className="inline-block bg-orange-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-orange-600 transition-colors duration-300"
                >
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogList;
