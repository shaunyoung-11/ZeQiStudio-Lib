// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const book = db.collection('book')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await book.where({
    isbn: event.isbn,
    state:true,
    owner: event.lib
  }).get()
}