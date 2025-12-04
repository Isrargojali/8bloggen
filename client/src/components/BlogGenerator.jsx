import React from "react";
import { useState } from "react";
import axios from "../api/axios";

const BlogGenerator = () => {
  const [keyword, setKeyword] = useState("");
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!keyword.trim()) return;

    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/generate-blog", { keyword });
      setBlog(res.data.blog);
    } catch (err) {
        console.error("Error generating blog:", err);
        const errorMessage = err.response?.data?.error || "Failed to generate blog. Please check if Cohere API key is configured.";
        setError(errorMessage);
        alert(errorMessage);
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

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      {blog && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Generated Blog:</h2>
          <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded border" dangerouslySetInnerHTML={{ __html: blog }} />
        </div>
      )}
    </div>
  );
};

export default BlogGenerator;
