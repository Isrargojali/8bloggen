const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  const { keyword } = req.body;

  // Validate keyword
  if (!keyword || !keyword.trim()) {
    return res.status(400).json({ error: "Keyword is required" });
  }

  // Check if API key is configured
  if (!process.env.COHERE_API_KEY || process.env.COHERE_API_KEY === "your-cohere-api-key-here") {
    return res.status(500).json({ 
      error: "Cohere API key is not configured. Please add your COHERE_API_KEY to the server .env file." 
    });
  }

  const prompt = `Write a detailed, SEO-optimized blog post of around 800–1000 words using the keyword: "${keyword}". 

IMPORTANT: Return ONLY raw HTML code without any markdown code blocks, backticks, or \`\`\`html tags.

Use proper HTML tags:
- Use <h2> and <h3> for headings and subheadings
- Use <ul> or <ol> for bullet/numbered lists
- Wrap each paragraph in <p> tags
- Use <strong> or <em> for emphasis where needed
- Add a clear structure: introduction, subheadings, lists, and conclusion

The tone should be friendly, informative, and professional. Keep paragraphs short and readable.

DO NOT wrap the response in markdown code blocks. Start directly with the HTML content.`;

  try {
    const response = await axios.post(
      "https://api.cohere.ai/v2/chat",
      {
        model: "command-a-03-2025",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data || !response.data.message || !response.data.message.content || !response.data.message.content[0]) {
      throw new Error("Invalid response from Cohere API");
    }

    let blog = response.data.message.content[0].text.trim();
    
    // Clean up markdown code blocks if present
    blog = blog.replace(/^```html\s*/i, '');
    blog = blog.replace(/^```\s*/i, '');
    blog = blog.replace(/\s*```$/i, '');
    blog = blog.trim();
    
    res.json({ blog });
  } catch (error) {
    console.error("Cohere error:", error.response?.data || error.message);
    
    let errorMessage = "Blog generation failed";
    if (error.response?.status === 401) {
      errorMessage = "Invalid Cohere API key. Please check your COHERE_API_KEY in the server .env file.";
    } else if (error.response?.status === 429) {
      errorMessage = "Rate limit exceeded. Please try again later.";
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    res.status(error.response?.status || 500).json({ error: errorMessage });
  }
});

module.exports = router;