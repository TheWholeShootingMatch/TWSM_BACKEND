var express = require('express');
var router = express.Router();
const { MongodbPersistence } = require('y-mongodb');
const mongoose = require('mongoose');
const location = process.env.DB_HOST;
const collection = 'yjs-versions';
const mdb = new MongodbPersistence(location, collection);
var TCTversions = require('../../models/tctVersions');
var { toUint8Array } = require('js-base64');


router.post("/", async (req, res, next) => {
    const docName = req.body.docName;
    const encodePersistedYdoc = toUint8Array(req.body.encodePersistedYdoc);
    const tctNum = req.body.tctNum;

    mdb.storeUpdate(docName, encodePersistedYdoc); //version y-doc 정보를 저장

    // docName과 TCT 번호를 매칭
    let versionDoc = new TCTversions({
        TcTnum: tctNum,
        docName: docName
    });
    
    versionDoc.save(err => {
        if (err) {
            res.json(false);
        }
        else {
            res.json(true);
        }
    });
})

router.post("/fetch", async (req, res, next) => {
    const tctnum = new mongoose.Types.ObjectId(req.body.tctNum);
    console.log("version", tctnum);
    const versions = await TCTversions.find({ TcTnum: tctnum });
    console.log(versions);
    res.json(versions);
});

module.exports = router;
