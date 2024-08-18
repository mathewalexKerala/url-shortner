require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
// Basic Configuration
app.use(express.json())
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
app.post('/api/shorturl', (req, res) => {
  const { url } = req.body;

  // Validate URL
  try {
      new URL(url);  // Throws an error if the URL is invalid
  } catch {
      return res.json({ error: 'invalid url' });
  }

  // Check if the URL is reachable
  const parsedUrl = new URL(url);
  dns.lookup(parsedUrl.hostname, (err) => {
      if (err) return res.json({ error: 'invalid url' });

      const shortId = nanoid(7);  // Generate a unique 7-character ID
      urlDatabase[shortId] = url;

      res.json({
          original_url: url,
          short_url: shortId
      });
  });
});

// Route to handle redirection
app.get('/api/shorturl/:shortId', (req, res) => {
  const { shortId } = req.params;
  const longUrl = urlDatabase[shortId];

  if (longUrl) {
      res.redirect(longUrl);
  } else {
      res.status(404).json({ error: 'not found' });
  }
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
  
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
