const express = require("express");
const { compileClientWithDependenciesTracked } = require("jade");
const router = express.Router();
const url = require('url');
const Todo = require("../models/todo");
let chatRecords = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/chat', function(req, res, next) {
  let adr = url.parse(req.url, true);
  let qdata = adr.query;
  if(qdata.user!=""||qdata.say!=""){
    chatRecords.push( {user: qdata.user ,say: qdata.say ,time: qdata.time} );
  }
  res.send(chatRecords);
});

router.get('/chat/clear', function(req, res, next) {
  chatRecords = [];
  res.send(chatRecords);
});

router.get('/chat/save', async(req, res, next) => {
  try {
      // 使用.save()將資料存進資料庫
      await Todo.remove();
      for (let i in chatRecords){
        console.log(chatRecords[i].user);
        console.log(chatRecords[i].say);
        console.log(chatRecords[i].time);
        let todo = new Todo({
          user: chatRecords[i].user,
          say: chatRecords[i].say,
          time: chatRecords[i].time,
        }); 
        const newTodo = await todo.save();
        //console.log("newtodo is :"+newTodo);
      }
  } 
  catch (err) {
      // 錯誤訊息發生回傳400 代表使用者傳入錯誤的資訊
      res.status(400).json({ message: err.message })
  }
  res.send(chatRecords);
});

router.get('/chat/reload', async (req, res, next) => {
  try {
    // 找出Todo資料資料表中的全部資料
    const todo = await Todo.find();
    // 將回傳的資訊轉成Json格式後回傳
    chatRecords = [];
    for(let i in todo){
      chatRecords.push( {user: todo[i].user ,say: todo[i].say ,time: todo[i].time} );     
    }
    res.send(chatRecords);
    //console.log(todo);
  } 
  catch (err) {
      // 如果資料庫出現錯誤時回報 status:500 並回傳錯誤訊息 
      res.status(500).json({ message: err.message })
  }
});


module.exports = router;

