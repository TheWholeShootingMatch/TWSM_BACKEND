var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var multer  = require('multer')
var multerS3 = require('multer-s3');
var Photographer = require('../models/photographer');
var Portfolio = require('../models/portfolioP');

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

  res.json(photographers);
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
    country : req.body.country,
    locations : req.body.locations,
  };

  if (req.file != null) {
    update.profile_img = req.file.location;
  }

  await Photographer.findOneAndUpdate(
    { Uid:req.session.user_Oid },
    {
      $set : update,
      $setOnInsert: { like_num: 0 }
    },
    {
      upsert:true
    },
    err => {
      if (err) throw err;
      return res.json({ success: true });
    }
  );
});

//for portfolio

router.post('/portfolioNew', upload, async (req, res, next) => {
  console.log("data received");
  const update = {
    id: req.session.user_Oid,
  };

  if (req.file != null) {
    update.link = req.file.location;
  }

  await Portfolio.findOneAndUpdate(
    { id:req.session.user_Oid },
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

router.get("/portfolioUid", async (req, res, next) => {
  const portfolio = await Portfolio.findOne({ Uid:req.session.user_Oid }, (err) => {
    if(err) {
      console.log(err);
    }
  });
  res.json(portfolio);
});

router.post("/portfolio", async (req, res, next) => {
  const portfolio = await Portfolio.findOne({ id:req.body.id }, (err) => {
    if(err) {
      console.log(err);
    }
  });
  res.json(portfolio);
});

module.exports = router;
