import BaseUtil from './BaseUtil'

class Tooltip extends BaseUtil {
  constructor(el) {
    super(el)
    this.bars = this.el.querySelectorAll('.js-btn--tooltip')
    this.tooltip = this.el.querySelector('.js-tooltip')
    this.listener = this.el.querySelector('.js-tooltipListener')
    this.events()
  }

  handleClick(e) {
    this.stop(e)
    this.removeAllClass(this.bars, this.css.active)

    let coords = this.getCoords(this.el, e)
    this.tooltip.style.top = coords.y + 'px'
    this.tooltip.style.left = coords.x + 'px'
    this.tooltip.classList.add(this.css.active)
    let val = e.target.getAttribute('data-tooltip')
    let cat = e.target.parentNode.getAttribute('data-bars')
    this.addClass(e.target, this.css.active)
    this.listener.setAttribute('data-val', `${val},${cat}`)
    this.listener.click()
  }

  closeTooltip(e) {
    this.stop(e)
    this.removeAllClass(this.bars, this.css.active)
    this.tooltip.classList.remove(this.css.active)
  }

  events() {
    this.on(this.tooltip, 'dblclick', this.closeTooltip.bind(this))
    this.onAll(this.bars, 'click', this.handleClick.bind(this))
    this.on(window, 'resize', this.closeTooltip.bind(this))
  }
}

export default Tooltip
