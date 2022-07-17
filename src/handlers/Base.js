class Base {
  constructor(el) {
    this.el = el
    this.css = {
      active: 'is-active'
    }
  }

  getCoords(el, e) {
    let rect = el.getBoundingClientRect()
    let x = e.clientX - rect.left
    let y = e.clientY - rect.top
    return { x, y }
  }

  stop(e) {
    e.stopPropagation()
  }

  on(el, event, callback) {
    el.addEventListener(event, callback)
  }

  onAll(list, event, callback) {
    ;[].forEach.call(list, function (e) {
      e.addEventListener(event, callback, false)
    })
  }
}

export default Base
