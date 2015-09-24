// Dependencies
var piblaster = require('pi-blaster.js')
var config = require('../config')

var control = {}

control.move = function () {
  piblaster.setPwm(config.gpioPin, 0.22)
}

control.default = function () {
  piblaster.setPwm(config.gpioPin, 0.24)
}

module.exports = control
