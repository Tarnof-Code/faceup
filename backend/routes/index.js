var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
var cloudinary = require('cloudinary').v2;
var fs = require('fs');
var request = require('sync-request');

cloudinary.config({
  cloud_name: 'dqt3m8u8y',
  api_key: '754252633288888',
  api_secret: 'T9wUqoQbQ2sIhlRzq8-PY9fo2pM'
});




router.post('/upload', async function (req, res) {

  var imagePath = './tmp/' + uniqid() + '.jpg'
  var resultCopy = await req.files.avatar.mv(imagePath);

  if (!resultCopy) {
    var resultCloudinary = await cloudinary.uploader.upload(imagePath);

    var options = {
      json: {
        apiKey: "5c0a5d392c1745d2ae84dc0b1483bfd2",
        image: resultCloudinary.url,
      },
    };

    var resultDetectionRaw = await request('POST', 'https://lacapsule-faceapi.herokuapp.com/api/detect', options);

    var resultDetection = await resultDetectionRaw.body;
    resultDetection = await JSON.parse(resultDetection);
    console.log(resultDetection)
    // console.log(result)

    res.json({ result: true, url: resultCloudinary.url, resultDetection: resultDetection });
  } else {
    res.json({ result: false, message: resultCopy });
  }
  fs.unlinkSync(imagePath);
});


module.exports = router;
