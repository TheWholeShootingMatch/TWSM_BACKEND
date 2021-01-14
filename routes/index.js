var express = require("express");
var router = express.Router();
var test = require('../models/test');

/* GET home page. */
router.get("/", function(req, res, next) {
  if(req.session.isLogin) {
    res.send(req.session.id);
  } else {
    res.send("main");
  }
});

module.exports = router;
