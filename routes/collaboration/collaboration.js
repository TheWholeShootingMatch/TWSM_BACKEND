var express = require('express');
var router = express.Router();
var Collaboration = require("../../models/corllaborate_projects");

router.post("/", async (req, res, next) => {
    const collaborates = await Collaboration.find(req.body.find, (err) => {
      if (err) {
        console.log(err);
      }
    })
    .sort(req.body.sort)
    res.json(collaborates);
});

router.post('/new', async(req, res, next) => {
    console.log("add collaborate");
    const update = new Collaboration({
      id: req.session.user_Oid,
      status : false,
      title : req.body.title,
      corporation_name : req.body.corporation_name,
      about_project : req.body.about_project,
      location : req.body.location,
      Pdate : req.body.date,
      model : req.body.Model,
      photographer: req.body.Photographer,
      gender: req.body.gender,
      age_min: req.body.age_min,
      age_max: req.body.age_max,
      height_min: req.body.height_min,
      height_max: req.body.height_max,
      weight_min: req.body.weight_min,
      weight_max: req.body.weight_max,
      busto_min: req.body.busto_min,
      busto_max: req.body.busto_max,
      quadril_min: req.body.quadril_min,
      quadril_max: req.body.quadril_max,
      cintura_min: req.body.cintura_min,
      cintura_max: req.body.cintura_max,
      ethnicity: req.body.ethnicity,
      eye_color: req.body.eye_color,
      hair_color: req.body.hair_color,
      model_field: req.body.model_field,
      model_detail: req.body.model_detail,
      photographer_field: req.body.photographer_field,
      retouch: req.body.retouch,
      photographer_detail: req.body.photographer_detail,
    });

    await update.save()
    .then(() => res.send(true))
    .catch(err => console.log(err));
})

router.post("/fetch", async (req, res, next) => {
  if (req.body._id.match(/^[0-9a-fA-F]{24}$/)) {
    const collaborate = await Collaboration.findOne({ _id:req.body._id }, (err) => {
      if(err) {
        console.log(err);
      }
    });
    res.json(collaborate);
  }
});

router.post("/delete", async (req, res, next) => {
  console.log("delete");
  Collaboration.deleteOne({_id:req.body._id}, function(err, slides) {
    if(err) console.log(err);
  });
  res.send(true);
});


module.exports = router;
