'use strict'

let TeslaManager = require('../Managers/TeslaManager')

let self = module.exports = {
  async getBatteryLevel(car) {
    let chargeState = car.getChargeState()
    if(!chargeState) {
      await TeslaManager.getCarChargeState(car)
      chargeState = car.getChargeState()
    }
    return chargeState.batteryLevel + "%"
  },

  async isCharging(car) {
    let chargeState = car.getChargeState()
    if(!chargeState) {
      await TeslaManager.getCarChargeState(car)
      chargeState = car.getChargeState()
    }
    let chargingState = chargeState.isCharging
    if(chargingState == 'Complete' || chargingState == 'Disconnected') {
      return false
    }
    return true
  }
}
