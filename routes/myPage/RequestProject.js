var express = require('express');
var router = express.Router();
var TCTs= require('../../models/tcts');
var notifications = require("../../models/notification");

router.post("/", (req, res, next) => {
    const { title, description } = req.body;
    const owner = req.session.user_id;
    
    const newRequest = new TCTs({
        owner: owner,
        title: title,
        description: description,
        status: "A",
        request_time: new Date().getTime()
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
    //유저가 요청한 프로젝트 (승인 여부 : A)
    else {
        requested_project = await TCTs.find({ owner: req.session.user_id, status: "A" });
    }
    res.json(requested_project);
});


module.exports = router;
