const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ 
        success: true, 
        message: "Universal Downloader is Live ✅",
        endpoints: ["/api/meta/download?url=INSTAGRAM_LINK"]
    });
});

// Instagram / Facebook / Threads Downloader
app.get('/api/meta/download', async (req, res) => {
    const { url } = req.query;
    
    if (!url) {
        return res.status(400).json({ success: false, error: "Please provide ?url= link" });
    }

    try {
        const response = await axios.get(`https://api.savetube.me/api/download`, {
            params: { url: url }
        });
        
        res.json({ success: true, data: response.data });
    } catch (err) {
        res.status(500).json({ 
            success: false, 
            error: "Failed to fetch media. Try again." 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
