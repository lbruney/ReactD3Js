import Tooltip from './Tooltip'
function boot() {
  document.querySelectorAll('[data-js-tooltip]').forEach(function (el) {
    new Tooltip(el)
  })
}

export default boot
