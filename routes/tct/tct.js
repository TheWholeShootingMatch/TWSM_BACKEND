var express = require("express");
var router = express.Router();
var TCTs = require("../../models/tcts");
var TcTMembers = require("../../models/tctMembers");
const mongoose = require("mongoose");
var yjsTransaction = require("../../models/yjsTransaction");
const redis = require("redis");

const whiteboard = redis.createClient({
    host: "13.124.192.207",
    port: 6379,
    password: process.env.REDIS_KEY
});

router.post("/", async (req, res, next) => {
    // 1. 로그인 상태인지 확인
    // 2. TCT에 속한 멤버인지 확인
    // 3. 프로젝트 고유 번호가 TCT에 존재하는지 확인

    if (req.session.isLogin) {
        const O_id = new mongoose.Types.ObjectId(req.session.user_Oid);
        const TcTnum = new mongoose.Types.ObjectId(req.body.TcTnum);
        const isTcTMember = await TcTMembers.find({ id: O_id, TcTnum: TcTnum });
        const project = await TCTs.find({ _id: req.body.TcTnum, status: "A" });

        if (project.length === 0 || isTcTMember.length === 0) {
            return res.send(false);
        } else {
            whiteboard.get(req.body.TcTnum, async (err, redisPersistedYdoc) => {
                if (redisPersistedYdoc) {
                    return res.send({
                        base64Ydoc: redisPersistedYdoc,
                        title: project[0].title
                    });
                } else {
                    const mongoPersistedYdoc = await yjsTransaction.findOne({ docName: req.body.TcTnum }, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    if (mongoPersistedYdoc !== null) {
                        console.log("successfully connect collaboration tool");
                        return res.send({
                            base64Ydoc: mongoPersistedYdoc.docInfo,
                            title: project[0].title
                        });
                    } else {
                        console.log("fail to connect collaboration toool");
                        const newYdoc = new yjsTransaction({
                            docName: req.body.TcTnum,
                            docInfo: " "
                        });
                        let result = await newYdoc.save();
                        return res.send({
                            base64Ydoc: "",
                            title: project[0].title
                        });
                    }
                }
            });
        }
    } else {
        return res.send(false);
    }
});

router.post("/fetch/title", async (req, res, next) => {
    const TcTnum = new mongoose.Types.ObjectId(req.body.TcTnum);
    const title = await TCTs.findOne({ _id: TcTnum }, (err) => {
        if (err) {
            console.log("fail to get title", err);
            res.json("");
        }
    }).select("title");
    res.json(title);
});

router.post("/title", async (req, res, next) => {
    const TcTnum = new mongoose.Types.ObjectId(req.body.TcTnum);
    const title = { $set: { title: req.body.titleInputs } }; //타이틀 변경

    await TCTs.updateOne({ _id: TcTnum }, title, (err) => {
        if (err) {
            console.log("fail to change title");
        } else {
            console.log(`${req.body.TcTnum} title is successfully changed`);
            return res.json(true);
        }
    });
});

// router.post('/whiteboard', async (req, res, next) => {
//     const persistedYdoc = await ldb.getYDoc(req.body.suffix);
//     const encodingYdoc = Y.encodeStateAsUpdate(persistedYdoc);
//     res.send(encodingYdoc);
// })

router.post("/model", async (req, res, next) => {
    const tctnum = new mongoose.Types.ObjectId(req.body.TcTnum);

    const models = await TCTs.findOne({ _id: req.body.TcTnum }).select("models").populate("models");

    res.json(models.models);
});

router.post("/photographer", async (req, res, next) => {
    const tctnum = new mongoose.Types.ObjectId(req.body.TcTnum);

    const photographers = await TCTs.findOne({ _id: req.body.TcTnum })
        .select("photographers")
        .populate("photographers");

    res.json(photographers.photographers);
});

module.exports = router;
