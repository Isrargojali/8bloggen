import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import Paragraph from "@tiptap/extension-paragraph";
import axios from "axios";
import Sidebar from "./Sidebar";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHighlighter,
  FaListUl,
  FaParagraph,
  FaHeading,
} from "react-icons/fa";

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const btnClass = "p-2 rounded hover:bg-gray-200 text-gray-700";

  return (
    <div className="flex flex-wrap gap-2 mb-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={btnClass}
        title="Bold"
      >
        <FaBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={btnClass}
        title="Italic"
      >
        <FaItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={btnClass}
        title="Underline"
      >
        <FaUnderline />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={btnClass}
        title="Highlight"
      >
        <FaHighlighter />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={btnClass}
        title="Bullet List"
      >
        <FaListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={btnClass}
        title="Paragraph"
      >
        <FaParagraph />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={btnClass}
        title="Heading 1"
      >
        <FaHeading style={{ fontSize: 18 }} /> 1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={btnClass}
        title="Heading 2"
      >
        <FaHeading style={{ fontSize: 18 }} /> 2
      </button>
    </div>
  );
};

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2] }),
      Highlight,
      Underline,
      TextStyle,
      BulletList,
      ListItem,
      Paragraph,
    ],
    content: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateImage = async () => {
    const prompt = title.trim();
    if (!prompt) {
      alert("Please enter a title or keyword first");
      return;
    }

    setImageLoading(true);
    try {
      const encodedPrompt = encodeURIComponent(prompt + " blog cover image high quality");
      const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=400&nologo=true`;
      
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "ai-generated.jpg", { type: "image/jpeg" });
      
      setImage(file);
      setPreview(imageUrl);
    } catch (err) {
      console.error("Error generating image:", err);
      alert("Failed to generate image");
    }
    setImageLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !editor.getHTML().trim() || !tags.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", editor.getHTML());
    formData.append("tags", tags);
    if (image) formData.append("image", image);

    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("You must be logged in to post a blog.");
      return;
    }

    try {
      await axios.post("/api/blogs/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Blog posted successfully!");
      setTitle("");
      setTags("");
      setImage(null);
      setPreview(null);
      editor.commands.clearContent();
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to post blog.");
    }
  };

  return (
    <div className="flex flex-row md:flex-row"> {/* Changed flex-row to flex-row-reverse */}
      <Sidebar />
      <div className="flex-1 max-w-4xl mx-auto bg-white shadow-lg p-6 rounded-lg mt-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Blog</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              placeholder="Blog title"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Content</label>
            <div className="border rounded shadow p-4 bg-white">
              <MenuBar editor={editor} />
              <EditorContent editor={editor} className="min-h-[200px]" />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Tags / Categories</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              placeholder="e.g. travel, nature, 2025"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Blog Image</label>
            <div className="flex space-x-2 mb-2">
              <input type="file" accept="image/*" onChange={handleImageChange} className="flex-1" />
              <button
                type="button"
                onClick={handleGenerateImage}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                disabled={imageLoading}
              >
                {imageLoading ? "Generating..." : "Generate AI Image"}
              </button>
            </div>
            {preview && (
              <img src={preview} alt="Preview" className="mt-4 w-full max-h-64 object-cover rounded" />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
