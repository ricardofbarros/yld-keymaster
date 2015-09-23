var control = require('./lib/control')

control.move()

setTimeout(function () {
  control.default()
}, 500)
