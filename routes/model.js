var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var multer  = require('multer')
var multerS3 = require('multer-s3');
var Model = require('../models/model');

require('dotenv').config({ path: '.env' });

//// Checking the existence of a profile
router.get("/ismodel", async (req, res, next) => {
  const model = await Model.findOne({ Uid:req.session.user_Oid }, (err) => {
    if(err) {
      console.log(err);
    }
  });
  if (model == null) {
    res.json(false)
  }
  res.json(true);
});

router.get("/searchForUid", async (req, res, next) => {
  const model = await Model.findOne({ Uid:req.session.user_Oid }, (err) => {
    if(err) {
      console.log(err);
    }
  });
  res.json(model);
});

//// for model
router.post("/", async (req, res, next) => {
  console.log(req.body.find)
  const models = await Model
  .find(req.body.find, (err) => {
    if(err) {
      console.log(err);
    }
  })
  .sort(req.body.sort)
  .skip(req.body.skip)
  .limit(req.body.limit);

  res.json(models);
});

//// for model_detail
router.post("/fetch", async (req, res, next) => {
  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    const model = await Model.findOne({ _id:req.body._id }, (err) => {
      if(err) {
        console.log(err);
      }
    });
    res.json(model);
  }
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

router.post('/new', upload, async (req, res, next) => {
  console.log("data received");
  const update = {
    Uid: req.session.user_Oid,
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
    career: req.body.career,
    country : req.body.country,
    locations : req.body.locations,
  };

  if (req.file != null) {
    update.profile_img = req.file.location;
  }

  await Model.findOneAndUpdate(
    { Uid:req.session.user_Oid },
    update,
    {
      upsert:true
    },
    err => {
      if (err) throw err;
      return res.json({ success: true });
    }
  );
});

module.exports = router;
