var express = require("express");
var router = express.Router();
var TCTs = require('../../models/tcts');
var TcTMembers = require('../../models/tctMembers');
const mongoose = require('mongoose');

router.post("/", async (req, res, next) => {

    // 1. 로그인 상태인지 확인
    // 2. TCT에 속한 멤버인지 확인
    // 3. 프로젝트 고유 번호가 TCT에 존재하는지 확인

    if (req.session.isLogin) {
        const O_id = new mongoose.Types.ObjectId(req.session.user_Oid);
        const TcTnum = new mongoose.Types.ObjectId(req.body.TcTnum);
        const isTcTMember = await TcTMembers.find({ id:O_id, TcTnum:TcTnum }, (err) => {
            if (err) {
                res.json(false);
            }
        })
        const project = await TCTs.find({ _id: req.body.TcTnum , status: "A" }, (err) => {
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
