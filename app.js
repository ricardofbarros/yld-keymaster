// Dependencies
var net = require('net')
var config = require('./config')
var piblaster = require('pi-blaster.js')

function boot () {
  var client = net.createConnection(config.gk.port, config.gk.host)
  moveRight()

  client.on('connect', function () {
    // Try to authenticate with the GK
    client.write(config.secureKey + '\r\n')
  })

  client.on('data', function (data) {
    data = data.toString().replace(/\r?\n/, '')

    switch (data) {
      case 'open':
        moveLeft()
        setTimeout(function () {
          moveRight()
        }, 1000)
        break
      default:
        moveRight()
    }
  })

  client.on('close', function () {
    // Restart on close
    setTimeout(function () {
      boot()
    }, config.reconnectTimeoutMs)
  })
}

function moveLeft () {
  piblaster.setPwm(config.gpioPin, 0.06)
}

function moveRight () {
  piblaster.setPwm(config.gpioPin, 0.24)
}

// Start keymaster
boot()
