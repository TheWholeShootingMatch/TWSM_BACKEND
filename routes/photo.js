var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var Photo = require('../models/photo');

router.post('/', upload.single('file'), function (req, res, next) {
  console.log("data received");
})

module.exports = router;
