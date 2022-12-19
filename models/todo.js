// 引入套件
const mongoose = require('mongoose');

// 該資料表的格式設定
const todoSchema = new mongoose.Schema({
    user: {
        type: String, //設定該欄位的格式
        required: true //設定該欄位是否必填
    },
    say: {
        type: String, //設定該欄位的格式
        required: true //設定該欄位是否必填
    },
    time: {
        type: String, //設定該欄位的格式
        required: true //設定該欄位是否必填
    }
})
//匯出該Model類別
module.exports = mongoose.model("record", todoSchema);
