var express = require('express');
var router = express.Router();
var Log = require('../models/log');

router.get("/", async (req, res, next) => {
  const logs = await Log.find({});
  res.json(logs);
});

router.post("/", function(req,res,next){
  console.log("data recieved");
  const now = new Date();

  let log = new Log({
    TcTnum:"000",
    id:"abc",
    Cnum:"000",
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
