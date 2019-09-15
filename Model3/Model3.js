'use strict'

const DriveState = require('./DriveState')
const ClimateState = require('./ClimateState')
const ChargeState = require('./ChargeState')

module.exports = class Model3 {
  constructor(vehicle, accessToken) {
    this.id = vehicle.id
    this.displayName = vehicle.display_name
    this.apiVersion = vehicle.api_version
    this.accessToken = accessToken
    this.awake = false
    this.driveState = null
    this.climateState = null
    this.chargeState = null
  }

  wakeUp() {
    this.awake = true
  }

  isAwake() {
    return this.awake
  }

  setDriveState(driveState) {
    this.driveState = new DriveState(driveState)
  }

  getDriveState() {
    return this.driveState
  }

  setClimateState(climateState) {
    this.climateState = new ClimateState(climateState)
  }

  getClimateState() {
    return this.climateState
  }

  setChargeState(chargeState) {
    this.chargeState = new ChargeState(chargeState)
  }

  getChargeState() {
    return this.chargeState
  }
}
