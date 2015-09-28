// Dependencies
var net = require('net')
var config = require('./config')
var control = require('./lib/control')

function boot () {
  // Create connection with GK
  var client = net.connect(config.gk)

  // Reset servo position
  control.default()

  client.on('connect', function () {
    // Try to authenticate with the GK
    client.write('auth:' + config.secureKey + '\r\n')
  })

  client.on('data', function (data) {
    data = data.toString().replace(/\r?\n/, '')

    switch (data) {
      case 'open':
        return open(client)
      default:
        client.write('error\r\n')
    }
  })

  client.on('close', function () {
    // Restart on close
    setTimeout(function () {
      boot()
    }, config.reconnectTimeoutMs)
  })
}

function open (client) {
  control.move()

  setTimeout(function () {
    control.default()
    setTimeout(function () {
      client.write('opened\r\n')
    }, 500)
  }, 500)
}

// Start keymaster
boot()
