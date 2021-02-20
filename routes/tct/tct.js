var express = require("express");
var router = express.Router();
var TCTs = require('../../models/tcts');
var TcTMembers = require('../../models/tctMembers');

router.post("/", async (req, res, next) => {

    // 1. 로그인 상태인지 확인
    // 2. TCT에 속한 멤버인지 확인
    // 3. 프로젝트 고유 번호가 TCT에 존재하는지 확인

    if (req.session.isLogin) {
        const isTcTMember = await TcTMembers.find({ id: req.session.user_id, TcTnum: req.body.TcTnum }, (err) => {
            if (err) {
                res.json(false);
            }
        })
        const project = await TCTs.find({ _id: req.body.TcTnum, status: "A" }, (err) => {
            if (err) {
                res.json(false);
            }
        });

        console.log(isTcTMember);

        if (project.length === 0 || isTcTMember.length === 0) {
            res.json(false);
        }
        else {
            res.json(true);
        }
    }
    else {
        res.send(false);
    }
});

module.exports = router;
