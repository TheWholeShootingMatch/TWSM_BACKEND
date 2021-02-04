var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("/");
})

router.get('/login', function(req, res, next) {
  if(req.session.isLogin) {  //login되어있으면 mainpage로 redirect
    console.log(req.session.isLogin, req.session.user_id);
    res.send(req.session.isLogin);
  } else {
    res.send("login");
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy(function () {
    req.session;
  });
  res.json(true);
});

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
        var dbPassword = user.pwd;
        var inputPassword = req.body.password;

        if (dbPassword === inputPassword) {
          console.log('비밀번호 일치');
          req.session.isLogin = true;
          req.session.user_id = req.body.id;
          console.log(req.body.id);
          console.log(req.session.user_id);
          res.send({id: req.session.user_id});
        }
        else {
          console.log('비밀번호 불일치');
          res.send({id: ''});
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
            email: req.body.email
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

module.exports = router;
