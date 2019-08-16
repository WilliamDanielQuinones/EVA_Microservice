'use strict'

const TeslaService = require('../Services/TeslaService')
const DriveState = require('./DriveState')

module.exports = class Model3 {
  constructor(vehicle) {
    this.id = vehicle.id
    this.displayName = vehicle.display_name
    this.apiVersion = vehicle.api_version
  }

  async wakeUp(authToken) {
    let response = await TeslaService.wakeUp(this.id, authToken)
    if(response == true) {
      return true
    }
    return false
  }

  async getDriveState(authToken) {
    let response = await TeslaService.getDriveState(this.id, authToken)
    return new DriveState(response)
  }
}
