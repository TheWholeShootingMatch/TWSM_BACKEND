var express = require("express");
var router = express.Router();
var Whiteboard = require('../models/whiteboard');

router.get("/", function(req, res, next) {
  const slides = Whiteboard.find({TcTnum:req.data.TcTnum});
  const slidesNum = Whiteboard.countDocuments({TcTnum:req.data.TcTnum});
  res.send(slides, slidesNum);
});

router.post("/add", function(req, res, next) {
  console.log("add new tabs");
  const newTab = new Whiteboard({
    TCTnum: req.slide.TcTnum,
    Snum: req.slide.id,
    Sname: req.slide.name
  });
  newTab.save();
  const tabs = Whiteboard.find({TcTnum:req.slide.TcTnum});
  res.send(tabs);
})

router.post("/rename", function(req, res, next) {
  console.log("rename");
  Whiteboard.update({TcTnum:req.slide.TcTnum, Tnum: req.slide.id}, {Tname: req.slide.name});
  const tabs = Whiteboard.find({TcTnum:req.slide.TcTnum});
})

router.post("/delite", function(req, res, next) {
  console.log("delete");
  Whiteboard.remove({TcTnum:req.slide.TcTnum, Tnum: req.slide.id});
  const tab = Whiteboard.find({TcTnum:req.slide.TcTnum});
})

module.exports = router;
