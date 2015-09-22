var config = {}

config.gk = {
  host: process.env.KM_GK_HOST,
  port: process.env.KM_GK_PORT
}

config.reconnectTimeoutMs = process.env.KM_RECONNECT || 10000

module.exports = config
