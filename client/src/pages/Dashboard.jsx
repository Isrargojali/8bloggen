import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import BlogCard from "../components/BlogCard";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);  // Ensure it's initialized as an empty array
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }
        const response = await axios.get("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data.");
      }
    };

    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("User is not authenticated.");
          return;
        }
        const response = await axios.get("/api/blogs/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Ensure that blogs data is properly fetched and set
        setBlogs(response.data.blogs || []);  // Use an empty array if no blogs
      } catch (err) {
        console.error(err);
        setError("Failed to fetch blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchBlogs();
  }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("User is not authenticated.");
        return;
      }
      await axios.delete(`/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete blog.");
    }
  };

  // Loading or error state handling
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Dashboard Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.name || "User"}
          </h2>
          {/* <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button> */}
        </div>

        <div className="mb-6">
          <Link
            to="/dashboard/blogs/create"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            + Create New Blog
          </Link>
        </div>

        {blogs.length === 0 ? (
          <p className="text-gray-500 mt-10 text-lg">No blogs found. Start creating!</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
