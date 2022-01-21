module.exports ={
    database:'mongodb+srv://sbn9987:981218as@qyaho.ynk2z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    secret:"Qyahosecret"
}

// mongoose.connect(config.database,{useNewUrlParser:true, useUnifiedTopology: true});
// mongoose.connection.on('connected', () => {
//     console.log('몽고DB 연결됨')
// })
// mongoose.connection.on('error', (err)=>{
//     console.log('Database error: '+err);
//   });