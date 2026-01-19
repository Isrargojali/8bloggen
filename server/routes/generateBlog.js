const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const { keyword } = req.body;

  if (!keyword || !keyword.trim()) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  const prompt = `Write a detailed, SEO-optimized blog post of around 500 words using the keyword: "${keyword}". 

Return a JSON object with two fields:
1. "blog": The blog content as raw HTML
2. "tags": An array of exactly 5 relevant SEO tags

Use HTML tags: <h2>, <h3>, <p>, <ul>, <li>, <strong>

Example: {"blog": "<h2>Title</h2><p>Content...</p>", "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]}

Return ONLY valid JSON, no markdown.`;

  try {
    const response = await axios.get(
      `https://text.pollinations.ai/${encodeURIComponent(prompt)}`,
      { timeout: 60000 }
    );

    let text = response.data;
    
    // Clean up response
    text = text.replace(/```json\s*/gi, '');
    text = text.replace(/```\s*/gi, '');
    text = text.trim();
    
    // Try to parse as JSON
    try {
      const parsed = JSON.parse(text);
      res.json({ 
        blog: parsed.blog || text, 
        tags: parsed.tags ? parsed.tags.join(", ") : keyword 
      });
    } catch {
      // If not JSON, return as blog with auto-generated tags
      const tags = keyword.split(" ").slice(0, 5).join(", ");
      res.json({ blog: text, tags });
    }
  } catch (error) {
    console.error("AI error:", error.message);
    res.status(500).json({ error: "Blog generation failed. Please try again." });
  }
});

module.exports = router;