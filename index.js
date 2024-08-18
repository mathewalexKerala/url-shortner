require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const app = express();

// Basic Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Static Files
app.use('/public', express.static(`${process.cwd()}/public`));

// Root Route
app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Short URL API Endpoint
app.post('/api/shorturl', (req, res) => {
  const { url } = req.body;

  // Validate URL
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    // Check if the URL is reachable
    dns.lookup(hostname, (err) => {
      if (err) return res.json({ error: 'invalid url' });

      // Generate a short URL (for simplicity, using a static ID here)
      const shortId = 1;  // Generate unique ID logic should be here
      res.json({
        original_url: url,
        short_url: shortId
      });
    });
  } catch {
    res.json({ error: 'invalid url' });
  }
});

// Redirect Route
app.get('/api/shorturl/:short_url', (req, res) => {
  const { short_url } = req.params;

  // Retrieve the original URL (for simplicity, using static URL here)
  const originalUrl = 'http://example.com';  // Retrieve the actual URL using short_url

  res.redirect(originalUrl);
});

// Hello API Endpoint
app.get('/api/hello', (req, res) => {
  res.json({ greeting: 'hello API' });
});

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
