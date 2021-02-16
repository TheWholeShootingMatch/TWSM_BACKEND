var express = require("express");
var router = express.Router();
var TCTs = require('../../models/tcts');

router.post("/", async (req, res, next) => {

    //프로젝트 정보가 db에 존재하는지 확인
    //나중에 협업 시, model과 photographer 정보도 확인함
    const project = await TCTs.find({ _id: req.body.TcTnum, status: "A" }, (err) => {
        if (err) {
            res.json(false);
        }
    });
    if (project.length === 0) {
        res.json(false);
    }
    else {
        res.json(true);
    }
});

module.exports = router;
