// Dependencies
var net = require('net')
var config = require('./config')
var control = require('./lib/control')

function boot () {
  var client = net.createConnection(config.gk.port, config.gk.host)
  control.right()

  client.on('connect', function () {
    // Try to authenticate with the GK
    client.write(config.secureKey + '\r\n')
  })

  client.on('data', function (data) {
    data = data.toString().replace(/\r?\n/, '')

    switch (data) {
      case 'open':
        control.left()
        setTimeout(function () {
          control.right()
        }, 1000)
        break
      default:
        control.right()
    }
  })

  client.on('close', function () {
    // Restart on close
    setTimeout(function () {
      boot()
    }, config.reconnectTimeoutMs)
  })
}

// Start keymaster
boot()
