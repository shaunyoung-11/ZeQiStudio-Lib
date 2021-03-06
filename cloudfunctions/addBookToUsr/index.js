// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const usr = db.collection('usr')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await usr.where({
    openId: wxContext.OPENID
  }).update({
    data:{
      borrow: _.addToSet(event.isbn),
      history: _.addToSet(event.isbn)
    }
  })
}