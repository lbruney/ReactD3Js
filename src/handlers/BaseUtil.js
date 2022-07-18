class BaseUtil {
  constructor(el) {
    this.el = el
    this.css = {
      active: 'is-active',
      inactive: 'is-inactive'
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

  toggleAllClass(list, className, toggle = 'add') {
    ;[].forEach.call(list, function (e) {
      e.classList[toggle](className)
    })
  }

  addAllClass(list, className) {
    this.toggleAllClass(list, className)
  }

  removeAllClass(list, className) {
    this.toggleAllClass(list, className, 'remove')
  }

  toggleClass(el, className, toggle = 'add') {
    el.classList[toggle](className)
  }

  addClass(el, className) {
    this.toggleClass(el, className)
  }

  removeClass(el, className) {
    this.toggleClass(el, className, 'remove')
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

export default BaseUtil
