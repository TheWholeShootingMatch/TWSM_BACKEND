var express = require('express');
var router = express.Router();
var User = require('../../models/users');

router.post("/", async (req, res, next) => {

    if (req.body.category === "model") {
        const favModels = await User
            .find({ _id: req.session.user_Oid })
            .skip(req.body.skipNum)
            .limit(6)
            .select('fav_models')
            .populate('fav_models');
        res.json(favModels);
    }
    else if (req.body.category === "photographer") {
        const favPhoto = await User
            .find({ _id: req.session.user_Oid })
            .skip(req.body.skipNum)
            .limit(6)
            .select('fav_photographers')
            .populate('fav_photographers');
        res.json(favPhoto);
    }
});

module.exports = router;
