const express =require('express');
const path = require('path');
const BodyParser = require ('body-parser');
const cors = require('cors');
const passport =require('passport');
const mongoose= require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/database');


// 익스프레스 객체 생성
const app= express();
//라우팅
const users =require('./routes/users')
const customers = require('./routes/users')
const cusnum = require('./routes/cusnum')
const businesses =require('./routes/businesses')

//cors
app.use(cors());
//static파일을 저장할 폴더 지정
app.use(express.static(path.join(__dirname,'public')));

//bodyparser 미들웨어
app.use(bodyParser.json());
//passport 미들웨어
app.use(passport.initialize());
app.use(passport.session());
//passport를 파라메터로 전송
require('./config/passport')(passport);

//users 경로 등록
app.use('/users',users);
app.use("/customers", customers);
app.use('/cusnum', cusnum);
app.use('/businesses',businesses);

const port =3000;

//mongoDB 연결부
mongoose.connect(config.database,{useNewUrlParser:true, useUnifiedTopology: true});
mongoose.connection.on('connected', () => {
    console.log('몽고DB 연결됨')
})
mongoose.connection.on('error', (err)=>{
    console.log('Database error: '+err);
  });

//서버 시작
app.listen(port, function(){
    console.log(`서버 시작됨 ${port}`);
});