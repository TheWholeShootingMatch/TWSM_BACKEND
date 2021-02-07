var express = require('express');
var router = express.Router();
var notification = require("../../models/notification");

router.get("/", async (req, res, next) => {
    const notifications = await notification.find({ receiver: req.session.user_id }, err => {
        if (err) {
            console.log("fail to request notifications",err);
        }
    });
    console.log(notifications);
    res.json(notifications);
});

router.post("/fetch", async (req, res, next) => {
    const findNotification = await notification.findOne({ _id: req.body._id }, err => {
        if (err) {
            console.log(err);
        }
    });
    res.json(findNotification);
});

module.exports = router;
