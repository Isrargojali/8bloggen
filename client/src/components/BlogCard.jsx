import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const BlogCard = ({ blog, onDelete }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

  const handleDelete = () => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (confirmed) {
      onDelete(blog._id);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 p-5 flex flex-col gap-4">
      {/* Blog Image */}
      {blog.image && (
        <Link to={`/blogs/${blog._id}`}>
          <img
            src={`${backendUrl}/uploads/${blog.image}`}
            alt={blog.title}
            className="w-full h-44 object-cover rounded-xl transition-transform duration-300 hover:scale-[1.02]"
          />
        </Link>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2">
        <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
      </h3>

      {/* Content Preview */}
      <div
        className="text-sm text-gray-600 leading-relaxed line-clamp-3 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 300) }}
      />

      {/* Tags */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 text-xs text-gray-500">
          {blog.tags.map((tag, index) => (
            <span key={index} className="bg-gray-100 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-3 border-t border-gray-100">
        <Link
          to={`/dashboard/blogs/edit/${blog._id}`}
          className="text-blue-500 hover:text-blue-700 transition-colors"
          title="Edit"
        >
          <FaEdit size={16} />
        </Link>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 transition-colors"
          title="Delete"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
