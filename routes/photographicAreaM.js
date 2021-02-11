var express = require('express');
var router = express.Router();
var PhotographicAreaM = require('../models/photographicAreaM');

router.post("/", async function(req,res,next){
  console.log("data recieved");
  await PhotographicAreaM.findOneAndUpdate(
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
  const photographicAreaM = await PhotographicAreaM.findOneAndRemove({ name: req.params.name, Uid: req.session.user_id })
  .then((result) => res.json(result));
});

router.get("/fetch", async (req, res, next) => {
  const photographicAreaM = await PhotographicAreaM.find({ Uid: req.session.user_id });
  res.json(photographicAreaM);
});

router.post("/searchMid", async (req, res, next) => {
  const photographicAreaM = await PhotographicAreaM.find({ Uid: req.body.Uid });
  res.json(photographicAreaM);
});

module.exports = router;
