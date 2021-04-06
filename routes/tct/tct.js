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

const client = redis.createClient(
  {
    host: "13.124.192.207",
    port: 6379,
    db: 0
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
            client.get(req.body.TcTnum, async (err, redisPersistedYdoc) => {
                if (redisPersistedYdoc) {
                    res.send(redisPersistedYdoc);
                }
                else {
                    const mongoPersistedYdoc = await mdb.getYDoc(req.body.TcTnum); //mongodb에서 doc을 가져옴
                    const unit8arrayYdoc = Y.encodeStateAsUpdate(mongoPersistedYdoc);
                    const base64Ydoc = fromUint8Array(unit8arrayYdoc)
                    res.send(base64Ydoc);
                }
            });           
        }
    }
    else {
        res.send(false);
    }
});

// router.post('/whiteboard', async (req, res, next) => {
//     const persistedYdoc = await ldb.getYDoc(req.body.suffix);
//     const encodingYdoc = Y.encodeStateAsUpdate(persistedYdoc);
//     res.send(encodingYdoc);
// })

router.post('/model', async (req, res, next) => {
  const tctnum = new mongoose.Types.ObjectId("600e4e20cfd1ee389c8c3fd0");

  const models = await TCTs
  .findOne({ _id:tctnum })
  .select('models')
  .populate('models')

  res.json(models.models);
});

router.post('/photographer', async (req, res, next) => {
  const tctnum = new mongoose.Types.ObjectId("600e4e20cfd1ee389c8c3fd0");

  const photographers = await TCTs
  .findOne({ _id:tctnum })
  .select('photographers')
  .populate('photographers')

  res.json(photographers.photographers);
});

module.exports = router;
