import Base from './Base'

class Tooltip extends Base {
  constructor(el) {
    super(el)
    this.events()
  }

  handleClick(e) {
    this.stop(e)
    console.log('hello')
  }

  events() {
    this.el.addEventListener('click', this.handleClick.bind(this))
  }
}

export default Tooltip
