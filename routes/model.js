var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var multer  = require('multer')
var multerS3 = require('multer-s3');
var Model = require('../models/model');

require('dotenv').config({ path: '.env' });

//// for model
router.get("/", async (req, res, next) => {
  const models = await Model.find({});
  res.json(models);
});

//// for model_detail
router.post("/fetch", async (req, res, next) => {
  const model = await Model.findOne({ _id:req.body._id });
  res.json(model);
});

//// for new_model
AWS.config.update({
    region : 'ap-northeast-2',
    accessKeyId : process.env.ACCESS_KEY_ID,
    secretAccessKey : process.env.SECRET_ACCESS_KEY,
});

const upload = multer({
    storage : multerS3({
        s3 : new AWS.S3(),
        bucket : 'twsm',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl : 'public-read',
        key(req, file, cb) {
            cb(null, new Date().toLocaleString());
        },
    }),
}).single("file");

router.post('/new', upload, (req, res, next) => {
  console.log("data received");
    let model = new Model({
      Uid: "000",
      profile_img: req.file.location,
      Name: req.body.Name,
      Age: req.body.Age,
      Gender: req.body.Gender,
      height: req.body.height,
      Busto: req.body.Busto,
      Quadril: req.body.Quadril,
      Cintura: req.body.Cintura,
      instagram: req.body.instagram,
      email: req.body.email,
      self_introduction: req.body.self_introduction,
      career: req.body.career
    });

    model.save(err => {
      if (err) throw err;
      return res.json({ success: true });
    });
});

module.exports = router;
