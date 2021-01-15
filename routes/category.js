var express = require('express');
var router = express.Router();
var Category = require('../models/category');

router.get("/", async (req, res, next) => {
  const category = await Category.find({});
  res.json(category);
});

router.post("/", function(req,res,next){
  console.log("data recieved");
  let category = new Category({
    TCTnum:"000",
    category:req.body.category
  });
  log.save(err => {
    if (err) throw err;
    return res.json({ success: true });
  });
});

module.exports = router;
