var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("/");
})

router.get('/login', function(req, res, next) {
  res.send('login');
});

router.post("/login", function(req,res,next){
    User.findOne({id:req.body.id}, function(err, user) {
      if(err) {
        console.log(err);
      }
      else if (!user) {
        console.log("아이디 없음1");
      }
      else {
        var dbPassword = user.pwd;
        var inputPassword = req.body.password;

        if (dbPassword === inputPassword) {
          console.log('비밀번호 일치');
          res.redirect("/api/index");
        }
        else {
          console.log('비밀번호 불일치');
        }
      }
    });
    // res.redirect("/login");
});

router.get('/signup', function(req, res, next) {
  res.send('signup');
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
          res.redirect('/api/users/login');
        }
        else {
          console.log('있는 아이디');
        }
      });
    }
    else {
      console.log("비밀번호가 다릅니다.");
      res.send('비밀번호 다름');
    }
});

module.exports = router;
