const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "Universal Downloader is running",
    author: "Modified for Vercel",
    endpoints: ["/api/meta/download", "/api/tiktok/download", "/api/threads/download"]
  });
});

// ==================== INSTAGRAM + FACEBOOK ====================
app.get('/api/meta/download', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ success: false, error: "URL is required" });

  try {
    const data = await require('./services/metaService')(url);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==================== TIKTOK ====================
app.get('/api/tiktok/download', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ success: false, error: "URL is required" });

  try {
    const response = await axios.post('https://api.tiklydown.eu.org/api/download', { url });
    res.json({ success: true, data: response.data });
  } catch (err) {
    res.status(500).json({ success: false, error: "TikTok service failed" });
  }
});

// ==================== THREADS ====================
app.get('/api/threads/download', async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ success: false, error: "URL is required" });

  try {
    const data = await require('./services/threadsService')(url);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
