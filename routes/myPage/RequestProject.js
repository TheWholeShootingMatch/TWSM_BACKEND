var express = require("express");
var router = express.Router();
var TCTs = require("../../models/tcts");
var TCTmembers = require("../../models/tctMembers");
var notifications = require("../../models/notification");
const { isValidObjectId } = require("mongoose");
const mongoose = require("mongoose");

router.post("/", (req, res, next) => {
    const { title, description, user } = req.body;
    const owner = req.session.user_Oid;

    const newRequest = new TCTs({
        owner: owner,
        title: title,
        description: description,
        status: "S",
        request_time: new Date()
    });

    if (user !== null && user !== "" && user !== undefined) {
        newRequest.initMembers = user;
    }

    newRequest.save((err) => {
        if (err) throw err;
        return res.send(true);
    });
});

router.get("/", async (req, res, next) => {
    let requested_project;

    //관리자에게 요청이 온 프로젝트 (승인 여부 : 상관 무)
    if (req.session.user_id === "manager") {
        requested_project = await TCTs.find({}).populate("owner", "id");
    }
    //유저가 요청한 프로젝트 (승인 여부 : S)
    else {
        requested_project = await TCTs.find({ owner: req.session.user_Oid, status: "S" });
    }
    res.json(requested_project);
});

router.get("/my-project", async (req, res, next) => {
    const myProjects = await TCTmembers.find({ id: req.session.user_Oid }).populate("TcTnum");
    res.json(myProjects);
});

/* 승인 된 프로젝트 넘버와 소속 멤버를 저장 */
const addTcTMembers = async (_id, userID) => {
    // const newMembers = new TCTmembers({
    //     id: userID,
    //     TcTnum : _id
    // })

    /* 초대된 다른 멤버들도 추가할 수 있도록 함 */
    let result = await TCTmembers.findOneAndUpdate(
        { TcTnum: _id, id: userID },
        {
            id: userID,
            TcTnum: _id
        },
        {
            upsert: true
        }
    );

    if (!result) {
        console.log("fail to add members");
        return false;
    } else {
        console.log("addTcTMembers", result);
        console.log("success to add members");
        return true;
    }
};

router.post("/invite", function (req, res, next) {
    const tctnum = new mongoose.Types.ObjectId(req.body.TcTnum);
    addTcTMembers(tctnum, req.session.user_Oid);
});

/* 승인 메세지를 전송 */
const sendNotification = async (_id, owner, type) => {
    const notification = new notifications({
        TcTnum: _id,
        sender: "manager",
        receiver: owner,
        sendTime: new Date().getTime(),
        type: type,
        status: true
    });

    let result = await notification.save();
    if (!result) {
        console.log("fail to send notification");
        return false;
    } else {
        console.log(result);
        console.log(`success to send notification`);
        return true;
    }
};

const inviteMember = async (_id, owner, user) => {
    const noti = new notifications({
        TcTnum: _id,
        sender: owner,
        receiver: user,
        sendTime: new Date().getTime(),
        type: "B",
        status: false
    });

    noti.save((err) => {
        return true;
    });
};

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
        } else {
            console.log(result);
            console.log(`${_id} project is successfully approved`);
            updateState = true;
        }

        let sendNotificationStatus = await sendNotification(_id, owner, "A");
        let addTcTMembersStatus = await addTcTMembers(_id, owner);

        const members = await TCTs.find({ _id: _id });
        members[0].initMembers.map((elem) => {
            if (elem.id !== owner) {
                inviteMember(_id, owner, elem);
            }
        });

        if (sendNotificationStatus && addTcTMembersStatus && updateState) {
            console.log(sendNotificationStatus, addTcTMembersStatus, updateState);
            res.json(true);
        } else {
            res.json(false);
        }
    } catch (e) {
        console.log(e);
    }
});

/* 프로젝트 거절 */
router.post("/deny", async (req, res, next) => {
    const _id = req.body._id;
    const owner = req.body.owner;
    const deny = { $set: { status: "D" } };
    let updateState;

    try {
        //tct 프로젝트 status 업데이트 (S -> D)
        const result = await TCTs.updateOne({ _id: _id }, deny);

        if (!result) {
            console.log("fail to deny project");
            updateState = false;
        } else {
            console.log(result);
            console.log(`${_id} project is successfully denied`);
            updateState = true;
        }

        let sendNotificationStatus = await sendNotification(_id, owner, "D");

        if (sendNotificationStatus && updateState) {
            console.log(sendNotificationStatus, updateState);
            res.json(true);
        } else {
            res.json(false);
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
