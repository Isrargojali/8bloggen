const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.post("/", async (req, res) => {
  const { keyword } = req.body;

  const prompt = `Write a detailed, SEO-optimized blog post of around 800–1000 words using the keyword: "${keyword}". 

Return the blog in clean **HTML format**, with proper tags:

- Use <h2> and <h3> for headings and subheadings
- Use <ul> or <ol> for bullet/numbered lists
- Wrap each paragraph in <p> tags
- Use <strong> or <em> for emphasis where needed
- Add a clear structure: introduction, subheadings, lists, and conclusion

The tone should be friendly, informative, and professional. Keep paragraphs short and readable.`;


  try {
    const response = await axios.post(
      "https://api.cohere.ai/v1/generate",
      {
        model: "command",
        prompt,
        max_tokens: 1000,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const blog = response.data.generations[0].text.trim();
    res.json({ blog });
  } catch (error) {
    console.error("Cohere error:", error.response?.data || error.message);
    res.status(500).json({ error: "Blog generation failed" });
  }
});

module.exports = router;