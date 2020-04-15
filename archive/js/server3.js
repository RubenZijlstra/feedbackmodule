const express = require('express');
const multer = require('multer');
const upload = multer();
const fs = require('fs');

var app = express();
app.use(express.static(__dirname));

app.post('/public/uploads', upload.any(), (req, res) => {
    console.log('POST /dump/');


    fs.writeFile("henk.ogg", req.buffer, (err) => {
        if (err) {
            console.log('Error: ', err);
            res.status(500).send('An error occurred: ' + err.message);
        } else {
            res.status(200).send('ok');
        }
    });
});

app.listen(process.env.PORT || 8081);