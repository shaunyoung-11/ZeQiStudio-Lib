// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const book = db.collection('book')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await book.add({
    data:{
      cover: event.cover,
      name: event.name,
      labels: event.labels,
      owner: event.owner,
      press: event.press,
      state: true,
      record: [],
      isbn: event.isbn,
      position: event.position
    }
  })
}