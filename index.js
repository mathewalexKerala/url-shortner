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
app.post("/api/shorturl", function (req, res) {
  const emailValid = true;
  const originalUrl = req.body.url;
  if (emailValid) {
    urlArr.push(originalUrl);
    res.status(200).json({
      original_url: originalUrl,
      short_url: urlArr.length,
    });
  } else {
    res.status(400).json({
      error: "invalid url",
    });
  }
});

app.get("/api/shorturl/:short_url", function (req, res) {
  const short_url = req.params.short_url - 1;
  const original_url = urlArr[short_url];
  if (short_url == undefined || original_url < short_url) {
    res.status(400).json({ respond: "Bad Request" });
  } else {
    res.redirect(original_url);
  }
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
  
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
