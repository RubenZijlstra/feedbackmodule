const express = require('express');
const multer = require('multer');
const upload = multer();
const fs = require('fs');
const https = require('https');
const filereader = require('filereader');


var app = express();
app.use(express.static(__dirname));

var uploaded = multer({dest: __dirname + '/public/uploads/temp'});
var type = uploaded.single('fileUpload');

app.post('/dump', type, function (req, res) {

  fs.rename(req.file.path, __dirname + '/public/uploads/' + req.file.originalname, function(err) {
    if (err) {
      res.status(500).send('An error occurred: ' + err.message);
    } else {
      res.status(200).send('ok');
    }
  });

});

app.listen(process.env.PORT || 8081);