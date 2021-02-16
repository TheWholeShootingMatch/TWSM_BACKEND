var express = require('express');
var router = express.Router();
var TcTModel = require('../models/TCTmodel');
var Model = require('../models/model');

router.post("/fetch", async (req, res, next) => {
  //조건으로 TCTnum 줄것
  const TCTmodels = await TcTModel.find({});

  res.json(TCTmodels);
});

module.exports = router;
