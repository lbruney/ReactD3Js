import Tooltip from './Tooltip'
function boot() {
  window.onload = function () {
    document.querySelectorAll('[data-js-tooltip]').forEach(function (el) {
      new Tooltip(el)
    })
  }
}

export default boot
