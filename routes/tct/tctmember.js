var express = require('express');
var router = express.Router();
var TCTmembers = require('../../models/tctMembers');

router.get("/", async (req, res, next) => {
  const members = await TCTmembers.find({id:req.session.user_Oid});
  console.log(members);
  console.log(req.session.user_Oid);
  res.json(members);
});

module.exports = router;
