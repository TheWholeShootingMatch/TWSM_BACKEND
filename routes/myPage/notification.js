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
    if (findNotification.status) {
        const verification = { $set: { status: false } }; //메일 확인
        await notification.updateOne({ _id: req.body._id }, verification, err => {
            if (err) {
                console.log("fail to verify notification");
            }
            else {
                console.log(`${req.body._id} notification is successfully verified`);
            }
            res.json(findNotification);
        });
    }
    else {
        res.json(findNotification);
    }
});

module.exports = router;
