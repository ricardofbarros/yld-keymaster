var control = require('./lib/control')

control.left()

setTimeout(function () {
  control.right()
}, 1000)
