var api = null
var Emitter = require('events').EventEmitter
var store = module.exports = new Emitter()

var newsData = {
  "1": {
    "id": 1,
    "title": "测试公告1",
    "data": 1433829726246,
    "content": "测试公告内容，测试公告内容1"
  },
  "2": {
    "id": 2,
    "title": "测试公告2",
    "data": 1433829726246,
    "content": "测试公告内容，测试公告内容2"
  },
  "3": {
    "id": 3,
    "title": "测试公告3",
    "data": 1433829726246,
    "content": "测试公告内容，测试公告内容3"
  },
  "4": {
    "id": 4,
    "title": "测试公告4",
    "data": 1433829726246,
    "content": "测试公告内容，测试公告内容4"
  }
}

store.fetchNews = function (cb) {
  //
  cb(newsData)
}

store.fetchNew = function(id, cb) {
  var item = newsData[id]
  cb(item)
}
