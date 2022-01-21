const express =require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');


//경로 /users/register
router.post('/register', (req, res, next) => {
    let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            birth: req.body.birth,
            
    });
  
    User.getUserByEmail(newUser.email, (err,email) => {
          if (err) throw err;
          if (email) {
            return res.json({ success: false, msg: "이미 가입한 이메일입니다." });
          } else {
        User.getUserByUsername(newUser.username, (err, user) => {
            if (user) {
              return res.json({ success: false, msg: "동일한 아이디가 존재합니다." });
            } else {
          User.addUser(newUser, (err, user) => {
                if (err) {
                    return res.json({ success: false, msg: '생년월일을 확인해주세요.' });
                } else {
                    return res.json({ success: true, msg: '회원가입 성공' });
                }
              });
            }
          });
        }
      });
    });
// /users/authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  
    User.getUserByUsername(username, (err, user) => {
      if(err) throw err;
      if(!user) {
        return res.json({success: false, msg: 'User not found'});
      }
  
      User.comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
          const token = jwt.sign({data:user}, config.secret, {
            expiresIn: 604800  // 1 week
          });
  
          res.json({
            success: true,
            token: 'JWT '+token,
            user: {  // 패스워드를 제외한 나머지 필요한 정보를 리턴
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email,
              birth: user.birth
            }
          });
        } else {
          return res.json({success: false, msg: 'Wrong password'});
        }
  
      });
    });
  });

//  접근은 로그인 상태에서만 토큰을 이용하여 접근하도록 설정 
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  const curr_time = new Date();
      res.json({
        user: {
          name: req.user.name,
          username: req.user.username,
          email: req.user.email,
          birth: req.user.birth,
          time : curr_time.getTime(),
          no : 0
        }
      });
  });

//validate
router.get('/validate',(req,res,next)=>{
    res.send('검증');
});

router.get('/list', (req, res, next) => {
      User.getAll((err, users) => {
        if (err) throw err;
        res.json(users);
      });
    });
    router.get("/cus_list", async (req, res) => {
      const customer = await User.find();
      res.json(customer);
    });
    
    router.get("/:id", async (req, res) => {
      const customer = await User.findById(req.params.id);
      res.json(customer);
    });
    //qr 정보를 백엔드에 보내야하는데 ..
    router.post("/cus_list", async (req, res) => {
      const customer = new User(req.body);
      await customer.save();
      res.json(customer);
    });
    
    router.post("/cus_list", async (req, res) => {
      const customer = new User(req.body);
      await customer.save();
      res.json(customer);
    });


    router.put("/:id", async (req, res) => {
      await User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false });
      res.json({
        message: "ok",
      });
    });
    
    router.delete("/remove", async (req, res) => {
      await User.deleteMany();
      res.json({
        message: "ok",
      });
    });
    
    router.delete("/cus_list/:id", async (req, res) => {
      await User.findByIdAndDelete(req.params.id);
      res.json({
        message: "ok",
      });
    });
    
module.exports = router;