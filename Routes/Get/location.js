'use strict'

let TeslaManager = require('../../Managers/TeslaManager')
let GoogleMapsServices = require('../../Services/GoogleMapsService')

module.exports = {
  async GPSCoordinates(params) {
    let token = await TeslaManager.getAuthToken()
    let model3 = await TeslaManager.getCarByName('Eva', token)
    await model3.wakeUp(token)
    let driveState = await model3.getDriveState(token)

    let coords = {
      latitude: driveState.latitude,
      longitude: driveState.longitude
    }

    let googleMaps = await GoogleMapsServices.initClient()
    let address = await GoogleMapsServices.getAddressFromCoordinates(googleMaps, coords.latitude, coords.longitude)
    console.log(address)
  },

  async getAddressByCoordinates(coords) {
    let googleMaps = GoogleMapsServices.initClient()
    return await GoogleMapsServices.getAddressFromCoordinates(googleMaps, coords.latitude, coords.longitude)
  }
}
