let _RiotControlApi = ['on','one','off','trigger']
let RiotControl = {
  _stores: [],
  addStore(store) {
    this._stores.push(store)
  }
}
_RiotControlApi.forEach(api => {
  RiotControl[api] = function() {
    let args = [].slice.call(arguments)
    this._stores.forEach(el => el[api].apply(null, args))
  }
})

// since riot is auto loaded by ProvidePlugin, merge the control into the riot object
riot.control = RiotControl
riot.SE = {
  LOADING_CHANGE: 'LOADING_CHANGE',
  MODAL_CHANGE: 'MODAL_CHANGE'
}
riot.VE = {
  TOGGLE_LOADING: 'TOGGLE_LOADING',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  LOAD_NEWS: 'LOAD_NEWS'
}