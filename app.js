// Dependencies
var net = require('net')
var config = require('./config')

function boot () {
  var client = net.createConnection(config.gk.port, config.gk.host)

  client.on('connect', function () {

  })

  client.on('close', function () {
    setTimeout(function () {
      boot()
    }, config.reconnectTimeoutMs)
  })
}

// Start keymaster
boot()
