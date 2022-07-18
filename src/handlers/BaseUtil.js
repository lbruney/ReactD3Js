class BaseUtil {
  constructor(el) {
    this.el = el
    this.css = {
      active: 'is-active',
      inactive: 'is-inactive'
    }
    this.keycodes = {
      enter: 'Enter'
    }
  }

  /**
   * Returns coordinates
   * @param {*} el Node object
   * @param {*} e Javascript event
   * @returns {object}
   */
  getCoords(el, e) {
    let rect = el.getBoundingClientRect()
    let x = e.clientX - rect.left
    let y = e.clientY - rect.top
    return { x, y }
  }

  /**
   * Prevents bubbling of javascript event to parent
   * @param {*} e Javascript event
   */
  stop(e) {
    e.stopPropagation()
  }

  /**
   * Toggles class on list of nodes
   * @param {*} list List of nodes
   * @param {string} className Name of css class
   * @param {string} toggle Name of method add | remove
   */
  toggleAllClass(list, className, toggle = 'add') {
    ;[].forEach.call(list, function (e) {
      e.classList[toggle](className)
    })
  }

  /**
   * Adds class to list of nodes
   * @param {array<object>} list
   * @param {string} className
   */
  addAllClass(list, className) {
    this.toggleAllClass(list, className)
  }

  /**
   * Removes class from list of nodes
   * @param {array{object}} list
   * @param {string} className
   */
  removeAllClass(list, className) {
    this.toggleAllClass(list, className, 'remove')
  }

  toggleClass(el, className, toggle = 'add') {
    el.classList[toggle](className)
  }

  /**
   * Adds class to node element
   * @param {object} el
   * @param {string} className
   */
  addClass(el, className) {
    this.toggleClass(el, className)
  }

  /**
   * Removes class from node element
   * @param {object} el
   * @param {string} className
   */
  removeClass(el, className) {
    this.toggleClass(el, className, 'remove')
  }

  /**
   * Adds event listen
   * @param {object} el Elment to bind event to
   * @param {string} event Name of event
   * @param {function} callback Callback function
   */
  on(el, event, callback, useCapture = false) {
    el.addEventListener(event, callback, useCapture)
  }

  /**
   * Adds event to list of nodes
   * @param {array{object}} list List of nodes
   * @param {string} event Name of event
   * @param {function} callback Callback function
   */
  onAll(list, event, callback, useCapture = false) {
    ;[].forEach.call(list, function (e) {
      e.addEventListener(event, callback, useCapture)
    })
  }

  /**
   * Gets the value of transform style
   * @param {object} el Node element
   * @returns {string} matrix(scaleX, skewY, skewX, scaleY, translateX, translateY)
   */
  getTranslate(el) {
    return window.getComputedStyle(el).transform
  }

  /**
   * Gets value of translate X
   * @param {object} el Node element
   * @returns {number}
   */
  getTranslateX(el) {
    let matrix = this.getTranslate(el).split(',')
    return +matrix[4]
  }

  /**
   * Determines whether a keydown/keypress operation is of Enter/13
   * @param {object} e Event
   * @returns {boolean}
   */
  isEnter(e) {
    return e.code === this.keycodes.enter
  }
}

export default BaseUtil
