var express = require('express');
var router = express.Router();
var Log = require('../models/log');


// router.get("/", function(req, res, next) {
//   res.send("abc");
// });

router.post("/", function(req,res,next){
  console.log("data recieved");
  var now = new Date();
  let log = new Log({
    TcTnum:"000",
    id:"abc",
    Cnum:"000",
    title:req.body.new_title,
    logdate:"2021-01-15T00:00:00.000Z"
  });
  log.save(err => {
    if (err) throw err;
    return res.json({ success: true });
  });
});

module.exports = router;
