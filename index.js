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
app.post('/api/shorturl',function(req,res){

  res.json({original_url:`${req.protocol}://${req.get('host')}`,short_url:1})
})
app.get('/api/shorturl/:short_url',function(req,res){
  res.redirect(`${req.protocol}://${req.get('host')}`)
})
// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
  
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
