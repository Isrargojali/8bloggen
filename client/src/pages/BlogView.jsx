import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import DOMPurify from "dompurify";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const BlogView = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch the blog data based on the ID from URL
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/blogs/${id}`);
        setBlog(response.data);
        setLoading(false);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to fetch the blog.");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        {/* Back to Blogs Button */}
        <button
          onClick={() => navigate("/blogs")} // Navigate back to blogs list
          className="mb-4 text-blue-500 hover:underline"
        >
          &larr; Back to Blogs
        </button>

        {/* Display image if it exists */}
        {blog.image && (
          <img
            src={`${backendUrl}/uploads/${blog.image}`}
            alt={blog.title}
            className="w-full h-72 object-cover rounded-t-lg"
          />
        )}

        {/* Blog Title */}
        <h1 className="text-3xl font-bold mt-6">{blog.title}</h1>

        {/* Blog Content with Tailwind Typography */}
        <div
          className="mt-4 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }}
        />

        {/* Blog Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-4 text-sm text-gray-500">
            <span className="font-semibold">Tags:</span> {blog.tags.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogView;
