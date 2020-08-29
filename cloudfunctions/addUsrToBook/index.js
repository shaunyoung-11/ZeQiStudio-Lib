// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _ = db.command
const book = db.collection('book')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var obj = {
    nickName: event.nickName,
    avatar: event.avatar,
    time: db.serverDate()
  }

  return await book.doc(event._id).update({
    data:{record: _.addToSet(obj)}
  })
}