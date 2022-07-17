import Base from './Base'

class Tooltip extends Base {
  constructor(el) {
    super(el)
    this.bars = this.el.querySelectorAll('.js-btn--tooltip')
    this.tooltip = this.el.querySelector('.js-tooltip')
    this.listener = this.el.querySelector('.js-tooltipListener')
    this.events()
  }

  handleClick(e) {
    this.stop(e)
    let coords = this.getCoords(this.el, e)
    this.tooltip.style.top = coords.y + 'px'
    this.tooltip.style.left = coords.x + 'px'
    this.tooltip.classList.add(this.css.active)
    let val = e.target.getAttribute('data-tooltip')
    this.listener.setAttribute('data-val', val)
    this.listener.click()
  }

  closeTooltip(e) {
    this.stop(e)
    this.tooltip.classList.remove(this.css.active)
  }

  events() {
    this.on(this.tooltip, 'click', this.closeTooltip.bind(this))
    this.onAll(this.bars, 'click', this.handleClick.bind(this))
  }
}

export default Tooltip
