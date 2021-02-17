var express = require('express');
var router = express.Router();
var Log = require('../models/log');
const mongoose = require('mongoose');

router.post("/fetch", async (req, res, next) => {
  await Log
  .find(req.body.find)
  .populate('writer')
  .populate('category')
  .exec((err,logs) => {
    if (err) throw err;
    res.json(logs);
  });
});

router.post("/", function(req,res,next){
  console.log("data recieved");
  const now = new Date();
  const tctnum = new mongoose.Types.ObjectId("600e6a885933af1a8c68aae3");

  let log = new Log({
    TcTnum: tctnum,
    writer: req.session.user_Oid,
    category:req.body.category,
    title:req.body.title,
    contents: req.body.text,
    logdate: now
  });

  log.save(err => {
    if (err) throw err;
    return res.json({ success: true });
  });

});

module.exports = router;
