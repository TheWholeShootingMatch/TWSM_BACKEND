var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var multer  = require('multer')
var multerS3 = require('multer-s3');
var Photographer = require('../models/photographer');
var PhotographicAreaP = require('../models/photographicAreaP');

require('dotenv').config({ path: '.env' });

//// Checking the existence of a profile
router.get("/isPhotographer", async (req, res, next) => {
  const photographer = await Photographer.findOne({ Uid:req.session.user_Oid }, (err) => {
    if(err) {
      console.log(err);
    }
  });
  if (photographer == null) {
    res.json(false)
  }
  res.json(true);
});

router.get("/searchForUid", async (req, res, next) => {
  const photographer = await Photographer.findOne({ Uid:req.session.user_Oid }, (err) => {
    if(err) {
      console.log(err);
    }
  });
  res.json(photographer);
});

//// for photographer
router.post("/", async (req, res, next) => {
  const photographers = await Photographer
  .find(req.body.find, (err) => {
    if(err) {
      console.log(err);
    }
  })
  .sort(req.body.sort)
  .skip(req.body.skip)
  .limit(req.body.limit);

  if (req.body.city !== "") {
    for (const elem of photographers) {
      const photographicAreaP = await PhotographicAreaP.findOne({ Uid: elem.Uid, name: req.body.city });
      if (photographicAreaP != null) {
        elem.city = true;
      }
    }

    const photographerC = photographers.filter(elem => elem.city);
    res.json(photographerC);
  }
  else {
    res.json(photographers);
  }
});

//// for photographer_detail
router.post("/fetch", async (req, res, next) => {
  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    const photographer = await Photographer.findOne({ _id:req.body._id }, (err) => {
      if(err) {
        console.log(err);
      }
    });
    res.json(photographer);
  }
});

//// for new_photographer
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
    instagram: req.body.instagram,
    email: req.body.email,
    self_introduction: req.body.self_introduction,
    career: req.body.career,
    language : req.body.language
  };

  if (req.file.location != null) {
    update.profile_img = req.file.location;
  }

  await Photographer.findOneAndUpdate(
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
