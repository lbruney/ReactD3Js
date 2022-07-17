class Base {
  constructor(el) {
    this.el = el
  }

  stop(e) {
    e.stopPropagation()
  }
}

export default Base
