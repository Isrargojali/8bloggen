const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const { keyword } = req.body;

  if (!keyword || !keyword.trim()) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: "GROQ API key not configured" });
  }

  const prompt = `Write a detailed, SEO-optimized blog post of around 500 words using the keyword: "${keyword}". 

Return a JSON object with two fields:
1. "blog": The blog content as raw HTML (use <h2>, <h3>, <p>, <ul>, <li>, <strong>)
2. "tags": An array of exactly 5 relevant SEO tags

Example: {"blog": "<h2>Title</h2><p>Content...</p>", "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]}

Return ONLY valid JSON, no markdown code blocks.`;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    let text = response.data.choices[0].message.content.trim();
    
    // Clean up markdown code blocks
    text = text.replace(/```json\s*/gi, '');
    text = text.replace(/```\s*/gi, '');
    text = text.trim();
    
    try {
      const parsed = JSON.parse(text);
      res.json({ 
        blog: parsed.blog || text, 
        tags: parsed.tags ? parsed.tags.join(", ") : keyword 
      });
    } catch {
      res.json({ blog: text, tags: keyword });
    }
  } catch (error) {
    console.error("Groq error:", error.response?.data || error.message);
    res.status(500).json({ error: "Blog generation failed. Please try again." });
  }
});

module.exports = router;