var express = require('express');
var router = express.Router();

router.get("/", async (req, res, next) => {

    if (req.session.user_id === "manager") {
        res.json(true);
    }
    else {
        res.json(false);
    }
});


module.exports = router;
