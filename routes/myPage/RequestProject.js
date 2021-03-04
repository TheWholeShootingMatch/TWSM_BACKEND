var express = require('express');
var router = express.Router();
var TCTs= require('../../models/tcts');
var notifications = require("../../models/notification");
const { isValidObjectId } = require('mongoose');

router.post("/", (req, res, next) => {
    const { title, description } = req.body;
    const owner = req.session.user_Oid;
    
    const newRequest = new TCTs({
        owner: owner,
        title: title,
        description: description,
        status: "S",
        request_time: new Date()
    });

    newRequest.save(err => {
        if (err) throw err;
        return res.send(true);
    });
});

router.get("/", async (req, res, next) => {
    let requested_project;

    //관리자에게 요청이 온 프로젝트 (승인 여부 : 상관 무)
    if (req.session.user_id === "manager") {
        requested_project = await TCTs.find({});
    }
    //유저가 요청한 프로젝트 (승인 여부 : S)
    else {
        requested_project = await TCTs.find({ owner: req.session.user_Oid, status: "S" });
    }
    res.json(requested_project);
});

router.get("/my-project", async (req, res, next) => {
        const myProject = await TCTs.find({ owner: req.session.user_Oid, status: "A" }, err => {
            if (err) {
                console.log("fail to request notifications", err);
            }
        });
        console.log(myProject);
        res.json(myProject);
   
});

router.post("/approve", (req, res, next) => {
    
    const _id = req.body._id;
    const owner = req.body.owner;
    const title = req.body.title;

    const approve = { $set: { status: "A" } }; //프로젝트 승인
    let updateState = false;
    
    TCTs.updateOne({ _id: _id }, approve, function (err, res) {
        if (err) {
            console.log("fail to approve project");
        }
        else {
            console.log(`${_id} project is successfully approved`);
            updateState = true;
        } 
    });

    const approveNotification = new notifications({
        TcTnum: _id,
        sender: "manager",
        receiver: owner,
        sendTime: new Date().getTime(),
        type: "A",
        status: true,
    });

    approveNotification.save(err => {
        if (err) {
            console.log("fail to send approve notification");
            updateState = false;
        }
        else {
            console.log(`success to send approve notification`);
            updateState = true;
        }
    });

    res.json(updateState);
})

module.exports = router;
