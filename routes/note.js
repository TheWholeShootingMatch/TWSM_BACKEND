var express = require('express');
var router = express.Router();
var Log = require('../models/log');
var Category = require('../models/category');

router.get("/", async (req, res, next) => {
  const logs = await Log.find({});
  for (const elem of logs) {
    const Cname = await Category.findOne({"_id":elem.Cnum});
    elem._doc.category = Cname.category;
  }
  res.json(logs);
});

router.post("/", function(req,res,next){
  console.log("data recieved");
  const now = new Date();

  let log = new Log({
    TcTnum:"000",
    id:"abc",
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
