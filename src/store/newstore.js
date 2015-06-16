const LOCALSTORAGE_KEY = 'riot-kit-demo'

class NewStore {
  constructor() {
    riot.observable(this)

    let json = window.localStorage.getItem(LOCALSTORAGE_KEY)
    if (!json) {
      this.initData()
    } else {
      this._posts = (json && JSON.parse(json)) || []
    }
  }

  getNewById(id) {
    return this._posts.filter(p => p.id == id)[0]
  }

  initData() {
    let defaultPosts = [
      {
        "id": 1,
        "title": "测试公告1",
        "data": 1433829726246,
        "content": "测试公告内容，测试公告内容1"
      },
      {
        "id": 2,
        "title": "测试公告2",
        "data": 1433829726246,
        "content": "测试公告内容，测试公告内容2"
      },
      {
        "id": 3,
        "title": "测试公告3",
        "data": 1433829726246,
        "content": "测试公告内容，测试公告内容3"
      },
      {
        "id": 4,
        "title": "测试公告4",
        "data": 1433829726246,
        "content": "测试公告内容，测试公告内容444444"
      }
    ]
    this._posts = defaultPosts
    this.saveToStorage()
  }

  saveToStorage() {
    window.localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(this._posts))
  }
}

let instance = new NewStore()

instance.on(riot.VE.LOAD_NEWS, () => {
  instance.trigger(riot.SE.NEWS_CHANGE, instance._posts)
})

// register to riot control by myself
riot.control.addStore(instance)
export default instance