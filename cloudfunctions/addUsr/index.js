// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const usr = db.collection('usr')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await usr.add({
    data:{
      openId: wxContext.OPENID,
      name: event.name,
      phone: event.phone,
      borrow: [],
      history:[],
      lib: event.lib
    }
  })
}