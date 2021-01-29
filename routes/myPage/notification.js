var express = require('express');
var router = express.Router();
var notification = require("../../models/notification");

router.get("/", async (req, res, next) => {
    let notifications = await notification.find({ receiver: req.session.user_id });
    console.log(notifications);
    res.json(notifications);
});

module.exports = router;
