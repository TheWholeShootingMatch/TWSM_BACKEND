var express = require("express");
var router = express.Router();
var test = require('../models/test');

/* GET home page. */
router.get("/", function(req, res, next) {
  test.find(function(err, result){
    if(err){
      console.log("err")
    }
    else{
      result.forEach(function(row){
        console.log(row.feild1);
      })
    }
  })
});

module.exports = router;
