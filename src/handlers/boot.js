import Tooltip from './Tooltip'
function boot() {
  window.onload = function () {
    document.querySelectorAll('.js-Tooltip').forEach(function (el) {
      new Tooltip(el)
    })
  }
}

export default boot
