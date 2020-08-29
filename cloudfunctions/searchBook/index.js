// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const book = db.collection('book')

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  return await book.where({
    name: db.RegExp({
      regexp: '.?' + event.key + '.?',
      options: 'is'
    }),
    owner: event.lib
  }).get()
}