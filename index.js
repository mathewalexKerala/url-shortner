require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');
const { nanoid } = require('nanoid'); // To generate unique short IDs
const app = express();

// Basic Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Static Files
app.use('/public', express.static(`${process.cwd()}/public`));

// In-memory store for URLs
const urlDatabase = {};

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

      // Generate a short URL ID
      const shortId = nanoid(7);  // Generate a unique 7-character ID
      urlDatabase[shortId] = url; // Store URL with the short ID

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
  const longUrl = urlDatabase[short_url]; // Retrieve URL from store

  if (longUrl) {
    res.redirect(longUrl); // Redirect to the original URL
  } else {
    res.status(404).json({ error: 'not found' });
  }
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
