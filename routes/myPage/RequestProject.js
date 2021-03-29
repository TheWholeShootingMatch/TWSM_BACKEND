var express = require('express');
var router = express.Router();
var TCTs= require('../../models/tcts');
var TCTmembers = require('../../models/tctMembers')
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
    const myProjects = await TCTmembers.find({ id: req.session.user_Oid }).populate('TcTnum');
    res.json(myProjects);
});

/* 승인 된 프로젝트 넘버와 소속 멤버를 저장 */
const addTcTMembers = async (_id, userID) => {
        
    const newMembers = new TCTmembers({
        id: userID,
        TcTnum : _id
    })
    /* 초대된 다른 멤버들도 추가할 수 있도록 함 */
    let result = await newMembers.save();
    if (!result) {
        console.log("fail to add members");
        return false;
    }
    else {
        console.log(result);
        console.log("success to add members");
        return true;
    }
}

/* 승인 메세지를 전송 */
const sendApproveNotification = async (_id, owner) => {
    
    const approveNotification = new notifications({
        TcTnum: _id,
        sender: "manager",
        receiver: owner,
        sendTime: new Date().getTime(),
        type: "A",
        status: true,
    });

    let result = await approveNotification.save();
    if (!result) {
        console.log("fail to send approve notification");
        return false;
    }
    else {
        console.log(result);
        console.log(`success to send approve notification`);
        return true;
    }
}

/* 프로젝트 승인 */
router.post("/approve", async (req, res, next) => {
    
    const _id = req.body._id;
    const owner = req.body.owner;
    const approve = { $set: { status: "A" } };
    let updateState;

    try {
         //tct 프로젝트 status 업데이트 (S -> A)        
        const result = await TCTs.updateOne({ _id: _id }, approve);

        if (!result) {
            console.log("fail to approve project");
            updateState = false;
        }
        else {
            console.log(result);
            console.log(`${_id} project is successfully approved`);
            updateState = true;
        }
        
        let sendNotificationStatus = await sendApproveNotification(_id, owner);
        let addTcTMembersStatus = await addTcTMembers(_id, owner);

        if (sendNotificationStatus && addTcTMembersStatus && updateState) {
            console.log(sendNotificationStatus, addTcTMembersStatus, updateState);
            res.json(true);
        }
        else {
            res.json(false);
        }  
        
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;
