import React from "react";
import { useState } from "react";
import axios from "axios";

const BlogGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!keyword.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/generate-blog", { keyword });
      setBlog(res.data.blog);
    } catch (err) {
        console.error("Error generating blog:", err);
        alert("Failed to generate blog.");
      }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">AI Blog Generator</h1>
      <input
        type="text"
        placeholder="Enter a blog keyword (e.g. Best travel destinations)"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full border px-4 py-2 mb-4 rounded"
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Generating..." : "Generate Blog"}
      </button>

      {blog && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Generated Blog:</h2>
          <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded border">
            {blog}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogGenerator;
