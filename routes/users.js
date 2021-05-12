var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* login이 되어있는지 확인*/
router.get('/login', function(req, res, next) {
  if (req.session.isLogin) {
    const isManager = req.session.user_id === "manager" ? true : false;
    res.send({ "name": req.session.user_name, "isManager": isManager });
  } else {
    res.send(false);
  }
});

/* logout */
router.get('/logout', function (req, res, next) {
  req.session.destroy(function () {
    req.session;
  });
  res.json(true);
});

/* login 시도 */
router.post("/login", function(req,res,next){
    User.findOne({id:req.body.id}, function(err, user) {
      if(err) {
        console.log(err);
      }
      else if (!user) {
        console.log("아이디 없음1");
        res.send({id:''});  //id ===""일 경우 변화 없음..
      }
      else {
        var status = user.status;
        var dbPassword = user.pwd;
        var inputPassword = req.body.password;

        if (status) {
          console.log('blocked user!')
          res.send({ name: '' }); //blocked user일 경우
        }
        else if (dbPassword === inputPassword) {
          console.log('비밀번호 일치');
          req.session.isLogin = true;
          req.session.user_id = req.body.id;
          req.session.user_Oid = user._id;
          req.session.user_name = user.name;
          res.send({name: req.session.user_name});
        }
        else {
          console.log('비밀번호 불일치');
          res.send({name: ''});
        }
      }
    });
});

router.get('/signup', function(req, res, next) {
  if(req.session.isLogin) {  //login되어있으면 mainpage로 redirect
    console.log(req.session.isLogin, req.session.user_id);
    res.send(req.session.isLogin);
  } else {
    res.send("login");
  }
});

/* 회원가입 시도 */
router.post("/signup", function(req,res,next){
    if(req.body.password === req.body.password_repeat) {
      User.findOne({id:req.body.id}, function(err, user) {
        if(err) {
          console.log(err);
        }
        else if (!user) {
          console.log("없는 아이디");
          const newUser = new User({
            id:req.body.id,
            name:req.body.name,
            pwd: req.body.password,
            email: req.body.email,
            status: false
          });
          newUser.save();
          res.send({isSignup: true, log:"signup ok"});
        }
        else {
          console.log('있는 아이디');
          res.send({isSignup: false, log:"id is already used"});
        }
      });
    }
    else {
      console.log("비밀번호가 다릅니다.");
      res.send({isSignup: false, log:"check password"});
    }
});

router.post("/fav_model", async function(req,res,next){
  const model = await User
  .findOne({ _id:req.session.user_Oid, fav_models:req.body.id })

  if (model === null) {
    res.send({check:false});
  }
  else {
    res.send({check:true});
  }
});

router.post("/fav_models_push", function(req,res,next){
  console.log("data recieved");

  User.findOneAndUpdate(
    { _id:req.session.user_Oid },
    {
      $addToSet: { fav_models : req.body.id }
    },
    err => {
      if (err) throw err;
    }
  );
});

router.post("/fav_models_del", function(req,res,next){
  console.log("data recieved");

  User.findOneAndUpdate(
    { _id:req.session.user_Oid },
    {
      $pull: { fav_models : req.body.id }
    },
    err => {
      if (err) throw err;
    }
  );
});

router.post("/fav_photographer", async function(req,res,next){
  const model = await User
  .findOne({ _id:req.session.user_Oid, fav_photographers:req.body.id })

  if (model === null) {
    res.send({check:false});
  }
  else {
    res.send({check:true});
  }
});

router.post("/fav_photographers_push", function(req,res,next){
  console.log("data recieved");

  User.findOneAndUpdate(
    { _id:req.session.user_Oid },
    {
      $addToSet: { fav_photographers : req.body.id }
    },
    err => {
      if (err) throw err;
    }
  );
});

router.post("/fav_photographers_del", function(req,res,next){
  console.log("data recieved");

  User.findOneAndUpdate(
    { _id:req.session.user_Oid },
    {
      $pull: { fav_photographers : req.body.id }
    },
    err => {
      if (err) throw err;
    }
  );
});

router.get('/user-list', async function (req, res, next) {
  userList = await User.find({}, { id: true, name: true, email: true, status: true, _id: false });
  if (userList) {
    res.json(userList);
  }
  else {
    res.json([]);
  }
})

router.post('/restore', async function (req, res, next) {
  const id = req.body.id;
  const status = { $set: { status: false } };

  try {
    const result = await User.updateOne({ id: id }, status);
    if (!result) {
      console.log("fail to restore user");
      res.json(false);
    }
    else {
      console.log("succeed to restore user");
      res.json(true);
    }
  } catch (e) {
    console.log(e);
    res.json(false);
  }
})

router.post('/block', async function (req, res, next) {
  const id = req.body.id;
  const status = { $set: { status: true } };

  try {
    const result = await User.updateOne({ id: id }, status);
    if (!result) {
      console.log("fail to block user");
      res.json(false);
    }
    else {
      console.log("succeed to block user");
      res.json(true);
    }
  } catch (e) {
    console.log(e);
    res.json(false);
  }
})

router.get('/mypage', function(req, res, next) {
  const my = User.findOne({id:req.body.id});
  res.json(my);
});

module.exports = router;
