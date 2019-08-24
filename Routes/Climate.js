'use strict'

let TeslaManager = require('../Managers/TeslaManager')

let self = module.exports = {
  async getTemperature(car) {
    let climateState = car.getClimateState()
    if(!climateState) await TeslaManager.setCarClimateState(car)

    let internalTemp = climateState.insideTemp
    return {internalTemp: internalTemp}
  },

  async setTemperature(car, temperatureCelsius) {

    let success = await TeslaManager.carTemperatureCommand(car, temperatureCelsius)

    return {success: success}
  },

  async startClimate(car) {
    let success = await TeslaManager.startHVACCommand(car)

    return {success: success}
  },

  async stopClimate(car) {
    let success = await TeslaManager.stopHVACCommand(car)

    return {success: success}
  },
}
