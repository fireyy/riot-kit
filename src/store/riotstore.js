class NewStore {
  constructor() {
    riot.observable(this)
    this._loading = {
      visible: false,
      text: "loading..."
    }
    this._modal = {
      heading: '活动说明',
      visible: false,
      body: '<p>活动说明1</p><p>活动说明2</p><p>活动说明3</p><p>活动说明4</p>',
      buttons: [
        { action: function () { self.modal.visible = false; }, text: 'Ok', style: 'color: white; background-color: #1fadc5; border-radius: 3px;' }
      ]
    }
  }
}

let instance = new NewStore()

instance.on(riot.VE.TOGGLE_LOADING, (loading) => {
  instance._loading = loading
  instance.trigger(riot.SE.LOADING_CHANGE, instance._loading)
})

instance.on(riot.VE.TOGGLE_MODAL, (modal) => {
  instance._modal = modal
  instance.trigger(riot.SE.MODAL_CHANGE, instance._modal)
})

// register to riot control by myself
riot.control.addStore(instance)
export default instance