'use strict'

let TeslaManager = require('./TeslaManager')

module.exports = {
  async GPSCoordinates(params) {
    let token = await TeslaManager.getAuthToken()
    let model3 = await TeslaManager.getCar('Eva', token)
    await model3.wakeUp(token)
    let driveState = await model3.getDriveState(token)

    let coords = {
      latitude: driveState.latitude,
      longitude: driveState.longitude
    }


  },

  async getAddressByCoordinates(coords) {

  }
}
