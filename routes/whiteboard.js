var express = require("express");
var router = express.Router();
var Whiteboard = require('../models/whiteboard');
var TCTs = require('../models/whiteboard');

router.post("/", function(req, res, next) {
  var next_slide = TCTs.findOne({_id:req.body.TcTnum});
  Whiteboard.find({TcTnum:req.body.TcTnum}, function(err, slides) {
    if(err) {
      console.log(err);
    } else {
      res.send(slides);
    }
  })
});

router.post("/add", function(req, res, next) {
  console.log("add new tabs");
  console.log(req.body);
  const newTab = new Whiteboard({
    TcTnum: req.body.TcTnum,
    Sname: req.body.Sname
  });
  newTab.save();
  Whiteboard.find({TcTnum:req.body.TcTnum}, function(err, slides) {
    if(err) {
      console.log(err);
    } else {
      res.send(slides);
    }
  });
})

router.post("/rename", function(req, res, next) {
  console.log("rename");
  console.log(req.body);
  Whiteboard.update({TcTnum:req.body.TcTnum, _id: req.body._id}, {Sname: req.body.Sname});
  Whiteboard.find({TcTnum:req.body.TcTnum}, function(err, slides) {
    if(err) {
      console.log(err);
    } else {
      res.send(slides);
    }
  });
})

router.post("/delete", function(req, res, next) {
  console.log("delete");
  console.log(req.body);
  Whiteboard.remove({TcTnum:req.body.TcTnum, _id: req.body._id}, function(err, slides){
    if(err) console.log(err);
  });
  Whiteboard.find({TcTnum:req.body.TcTnum}, function(err, slides) {
    if(err) {
      console.log(err);
    } else {
      res.send(slides);
    }
  });
})

module.exports = router;
