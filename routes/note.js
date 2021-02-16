var express = require('express');
var router = express.Router();
var Log = require('../models/log');
var Category = require('../models/category');
const mongoose = require('mongoose');

router.get("/", async (req, res, next) => {
  await Log
  .find({})
  .populate('Cnum')
  .exec((err,logs) => {
    if (err) throw err;
    console.log(logs);
    res.json(logs);
  });
});

router.post("/", function(req,res,next){
  console.log("data recieved");
  const now = new Date();
  const tctnum = new mongoose.Types.ObjectId("600e6a885933af1a8c68aae3");

  let log = new Log({
    TcTnum: tctnum,
    id: req.session.user_Oid,
    Cnum:req.body.Cnum,
    title:req.body.new_title,
    contents: req.body.new_text,
    logdate: now
  });
  log.save(err => {
    if (err) throw err;
    return res.json({ success: true });
  });

});

module.exports = router;
