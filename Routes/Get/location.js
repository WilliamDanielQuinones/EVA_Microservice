'use strict'

let TeslaManager = require('./TeslaManager')

module.exports = {
  async GPSCoordinates(params) {
    let token = await TeslaManager.getAuthToken()
    await TeslaManager.getCar('Eva', token)
  }
}
