var express = require('express');
var router = express.Router();
var notification = require("../../models/notification");

router.get("/", async (req, res, next) => {
    const notifications = await notification.find({ receiver: req.session.user_Oid }, err => {
        if (err) {
            console.log("fail to request notifications",err);
        }
    });
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

router.post("/invite", function(req,res,next){
  console.log("data recieved");
  const now =new Date().getTime().toString()

  let noti = new notification({
    TcTnum: req.body.TcTnum,
    sender: req.session.user_name,
    receiver: req.body.id,
    sendTime:now,
    type:'B',
    status:false
  });

  noti.save(err => {
    if (err) throw err;
    res.json({ success: true });
  });
});

module.exports = router;
