// Dependencies
var piblaster = require('pi-blaster.js')
var config = require('../config')

var control = {}

control.left = function () {
  piblaster.setPwm(config.gpioPin, 0.06)
}

control.right = function () {
  piblaster.setPwm(config.gpioPin, 0.24)
}

module.exports = control
