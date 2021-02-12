var express = require('express');
var router = express.Router();
var PhotographicAreaP = require('../models/photographicAreaP');

router.post("/", async function(req,res,next){
  console.log("data recieved");
  await PhotographicAreaP.findOneAndUpdate(
    {name: req.body.name, Uid: req.session.user_id},
    {
      ciso: req.body.ciso,
      siso: req.body.siso,
      Uid: req.session.user_id,
      name: req.body.name,
    },
    {
      upsert:true
    },
    err => {
      if (err) throw err;
      return res.json({ success: true });
    }
  );
});

router.delete("/delete/:name", async function(req,res,next){
  const photographicAreaP = await PhotographicAreaP.findOneAndRemove({ name: req.params.name, Uid: req.session.user_id })
  .then((result) => res.json(result));
});

router.get("/fetch", async (req, res, next) => {
  const photographicAreaP = await PhotographicAreaP.find({ Uid: req.session.user_id });
  res.json(photographicAreaP);
});

router.post("/searchPid", async (req, res, next) => {
  const photographicAreaP = await PhotographicAreaP.find({ Uid: req.body.Uid });
  res.json(photographicAreaP);
});

module.exports = router;
