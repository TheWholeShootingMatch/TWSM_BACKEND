var express = require('express');
var router = express.Router();
var Category = require('../models/category');

router.get("/", async (req, res, next) => {
  //tct number로 검색
  const category = await Category.find({});
  res.json(category);
});

router.post("/", function(req,res,next){
  console.log("data recieved");
  const tctnum = new mongoose.Types.ObjectId("600e6a885933af1a8c68aae3");

  let category = new Category({
    TCTnum:tctnum,
    name:req.body.name
  });

  category.save(err => {
    if (err) throw err;
    res.json({ success: true });
  });
});

module.exports = router;
