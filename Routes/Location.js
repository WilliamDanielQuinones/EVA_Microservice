'use strict'

let GoogleMapsServices = require('../Services/GoogleMapsService')
let TeslaManager = require('../Managers/TeslaManager')

let self = module.exports = {
  async getAddress(car) {
    if(!car.getDriveState()) await TeslaManager.getCarDriveState(car)

    let coords = await self.getGPSCoordinates(car)
    let googleMaps = await GoogleMapsServices.initClient()
    if(!googleMaps) return 'No Google Maps API key set'

    let address = await GoogleMapsServices.getAddressFromCoordinates(googleMaps, coords.latitude, coords.longitude)
    if(!address) return 'Could not retrieve Address from coordinates'

    return address
  },

  async getGPSCoordinates(car) {
    if(!car.getDriveState()) await TeslaManager.getCarDriveState(car)

    let driveState = car.getDriveState()
    return {
      latitude: driveState.latitude,
      longitude: driveState.longitude
    }
  }
}
