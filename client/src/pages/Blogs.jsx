import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [uniqueTags, setUniqueTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/blogs/all`);
        setBlogs(response.data);

        // Extract unique tags
        const tagsSet = new Set();
        response.data.forEach(blog => {
          blog.tags?.forEach(tag => tagsSet.add(tag));
        });

        setUniqueTags(["All", ...Array.from(tagsSet)]);
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [backendUrl]);

  useEffect(() => {
    if (selectedTag === "All") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(blog => blog.tags?.includes(selectedTag));
      setFilteredBlogs(filtered);
    }
  }, [selectedTag, blogs]);

  const getImageUrl = (image) => {
    if (!image) return "https://via.placeholder.com/400x300?text=No+Image";
    if (image.startsWith("http")) return image;
    return `${backendUrl}/uploads/${image}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Our Blogs</h1>

        {/* Tag Filter */}
        <div className="flex justify-center flex-wrap gap-3 px-4">
          {uniqueTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`text-sm px-4 py-1 rounded-full transition-colors border ${
                selectedTag === tag
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-blue-500 hover:text-blue-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Blog List */}
      {loading ? (
        <div className="text-center text-gray-700">Loading blogs...</div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center text-gray-600">No blogs found for tag: {selectedTag}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
          {filteredBlogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={getImageUrl(blog.image)}
                alt={blog.title}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                }}
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                  {blog.title}
                </h2>
                <div
                  className="text-sm text-gray-600 mt-2 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: blog.content?.slice(0, 150) + "..." }}
                />
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  to={`/blogs/${blog._id}`}
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
