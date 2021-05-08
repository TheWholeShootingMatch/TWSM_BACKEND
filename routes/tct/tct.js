var express = require("express");
var router = express.Router();
var TCTs = require('../../models/tcts');
var TcTMembers = require('../../models/tctMembers');
const mongoose = require('mongoose');
var Y = require('yjs');
const { MongodbPersistence } = require('y-mongodb');
const location = process.env.DB_HOST;
const collection = 'yjs-transactions';
const mdb = new MongodbPersistence(location, collection);
const redis = require("redis");

const whiteboard = redis.createClient(
  {
    host: "13.124.192.207",
        port: 6379,
        password: process.env.REDIS_KEY
    });

var { fromUint8Array } = require('js-base64');

router.post("/", async (req, res, next) => {

    // 1. 로그인 상태인지 확인
    // 2. TCT에 속한 멤버인지 확인
    // 3. 프로젝트 고유 번호가 TCT에 존재하는지 확인

    if (req.session.isLogin) {
        const O_id = new mongoose.Types.ObjectId(req.session.user_Oid);
        const TcTnum = new mongoose.Types.ObjectId(req.body.TcTnum);
        const isTcTMember = await TcTMembers.find({ id:O_id, TcTnum:TcTnum }, (err) => {
            if (err) {
                res.send(false);
            }
        })
        const project = await TCTs.find({ _id: req.body.TcTnum , status: "A" }, (err) => {
            if (err) {
                res.send(false);
            }
        });

        if (project.length === 0 || isTcTMember.length === 0) {
            res.send(false);
        }
        else {
            whiteboard.get(req.body.TcTnum, async (err, redisPersistedYdoc) => {
                if (redisPersistedYdoc) {
                    res.send({
                        base64Ydoc: redisPersistedYdoc,
                        title: project[0].title
                    });
                }
                else {
                    const mongoPersistedYdoc = await mdb.getYDoc(req.body.TcTnum); //mongodb에서 doc을 가져옴
                    const unit8arrayYdoc = Y.encodeStateAsUpdate(mongoPersistedYdoc);
                    const base64Ydoc = fromUint8Array(unit8arrayYdoc);
                    console.log(project[0].title);
                    res.send({
                        base64Ydoc: base64Ydoc,
                        title: project[0].title
                    });
                }
            });
        }
    }
    else {
        res.send(false);
    }
});

router.post('/title', async (req, res, next) => {

    const TcTnum = new mongoose.Types.ObjectId(req.body.TcTnum);
    const title = { $set: { title: req.body.titleInputs } }; //타이틀 변경

    await TCTs.updateOne({ _id: TcTnum }, title, err => {
        if (err) {
            console.log("fail to change title");
        }
        else {
            console.log(`${req.body.TcTnum} title is successfully changed`);
            return res.json(true);
        }
    });
})

// router.post('/whiteboard', async (req, res, next) => {
//     const persistedYdoc = await ldb.getYDoc(req.body.suffix);
//     const encodingYdoc = Y.encodeStateAsUpdate(persistedYdoc);
//     res.send(encodingYdoc);
// })

router.post('/model', async (req, res, next) => {
  const tctnum = new mongoose.Types.ObjectId(req.body.TcTnum);

  const models = await TCTs
  .findOne({ _id:req.body.TcTnum })
  .select('models')
  .populate('models')

  res.json(models.models);
});

router.post('/photographer', async (req, res, next) => {
  const tctnum = new mongoose.Types.ObjectId(req.body.TcTnum);

  const photographers = await TCTs
  .findOne({ _id:req.body.TcTnum })
  .select('photographers')
  .populate('photographers')

  res.json(photographers.photographers);
});

module.exports = router;
