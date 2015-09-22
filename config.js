var config = {}

config.gk = {
  host: process.env.KM_GK_HOST,
  port: process.env.KM_GK_PORT
}

config.secureKey = process.env.KM_SECURE_KEY
config.reconnectTimeoutMs = process.env.KM_RECONNECT || 10000

module.exports = config
