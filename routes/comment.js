var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

router.post("/", function(req,res,next){
  console.log("data recieved");
  const now = new Date();

  let comment = new Comment({
    Lnum: req.body.Lnum,
    writer: req.session.user_Oid,
    Wdate:now,
    contents: req.body.contents
  });

  comment.save(err => {
    if (err) throw err;
    res.json({ success: true });
  });
});

router.post("/fetch", async (req, res, next) => {
  const comments = await Comment
  .find({ Lnum:req.body.Lnum })
  .populate('writer');
  res.json(comments);
});

module.exports = router;
