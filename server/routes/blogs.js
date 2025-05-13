const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to store images
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});
const upload = multer({ storage });

/**
 * @route   POST /api/blogs/create
 * @desc    Create a new blog post
 * @access  Private (Only authorized users can create a blog)
 */
router.post("/create", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const image = req.file ? req.file.filename : "";

    const newBlog = new Blog({
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      image,
      author: req.user.id,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ error: "Failed to create blog" });
  }
});

/**
 * @route   GET /api/blogs/user
 * @desc    Get all blogs by the logged-in user
 * @access  Private (Only authorized users can access their blogs)
 */
router.get("/user", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error("Error fetching user blogs:", err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

/**
 * @route   GET /api/blogs/all
 * @desc    Get all blogs (from all users)
 * @access  Public (Anyone can view all blogs)
 */
router.get("/all", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ error: "No blogs found" });
    }

    res.json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route   PUT /api/blogs/:id
 * @desc    Update a blog post
 * @access  Private (Only authorized users can edit their own blog)
 */
router.put("/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized or blog not found" });
    }

    blog.title = title;
    blog.content = content;
    blog.tags = tags.split(",").map((tag) => tag.trim());
    if (req.file) {
      blog.image = req.file.filename;
    }

    await blog.save();
    res.json({ message: "Blog updated successfully", blog });
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ error: "Failed to update blog" });
  }
});

/**
 * @route   DELETE /api/blogs/:id
 * @desc    Delete a blog post
 * @access  Private (Only authorized users can delete their own blog)
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog || blog.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized or blog not found" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

/**
 * @route   GET /api/blogs/:id
 * @desc    Fetch a single blog by ID
 * @access  Public (Anyone can view a blog)
 */
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

module.exports = router;
