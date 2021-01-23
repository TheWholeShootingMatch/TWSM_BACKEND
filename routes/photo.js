var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: '../uploads/' })
var Photo = require('../models/photo');

router.post('/', upload.single('file'), function (req, res, next) {
  console.log("data received");

  let photo = new Photo({
    link : req.file.path,
    type : req.file.mimetype
  });

  photo.save(err => {
    if (err) throw err;
    return res.json({ success: true });
  });
})

router.get("/", async (req, res, next) => {
  const photos = await Photo.find({});
  // photos.map((elem) => {
  // });
  res.json(photos);
});

module.exports = router;
