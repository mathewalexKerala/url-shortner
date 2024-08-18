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
  console.log(`${req.protocol}://${req.get('host')}`)
  res.redirect(`${req.protocol}://${req.get('host')}`)
})
// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
  
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
