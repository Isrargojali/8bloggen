import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import Sidebar from "../pages/Sidebar";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userIsAdmin = user.isAdmin === true;
        setIsAdmin(userIsAdmin);

        // Admin sees all blogs, regular users see only their own
        const endpoint = userIsAdmin ? "/api/blogs/all" : "/api/blogs/user";
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blogs from the server.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete the blog.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <h2 className="text-3xl font-semibold mb-6">
          {isAdmin ? "All Blogs (Admin View)" : "Your Blogs"}
        </h2>
        {isAdmin && (
          <p className="text-sm text-red-600 mb-4">
            Admin mode: You can delete any blog post.
          </p>
        )}

        {loading ? (
          <p className="text-gray-500">Loading blogs...</p>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">You have not written any blogs yet.</p>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;
