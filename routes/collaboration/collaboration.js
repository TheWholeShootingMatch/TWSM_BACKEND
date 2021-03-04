var express = require('express');
var router = express.Router();
var collaboration = require("../../models/corllaborate_projects");

router.get("/", async (req, res, next) => {
    let collaborations;
    collaborations = await collaboration.find({});
    console.log(collaborations);
    res.json(collaborations);
});

module.exports = router;
