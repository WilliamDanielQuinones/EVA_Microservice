'use strict'

let TeslaManager = require('../Managers/TeslaManager')

let self = module.exports = {
  async getTemperature(car) {
    let climateState = car.getClimateState()
    if(!climateState) {
      await TeslaManager.getCarClimateState(car)
      climateState = car.getClimateState()
    }
    return climateState.insideTemp
  },

  async setTemperature(car, temperatureCelsius) {

    let response = await TeslaManager.carTemperatureCommand(car, temperatureCelsius)
    return response
  },

  async startClimate(car) {
    let response = await TeslaManager.startHVACCommand(car)
    return response
  },

  async stopClimate(car) {
    let response = await TeslaManager.stopHVACCommand(car)
    return response
  },
}
