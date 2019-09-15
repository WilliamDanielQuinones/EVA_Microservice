'use strict'

let TeslaManager = require('../Managers/TeslaManager')

let self = module.exports = {
  async getTemperature(car) {
    let climateState = car.getClimateState()
    if(!climateState) {
      await TeslaManager.getCarClimateState(car)
      climateState = car.getClimateState()
    }
    let tempCelsius = climateState.insideTemp
    return Math.round(self._convertToFahrenheit(tempCelsius))
  },

  async setTemperature(car, degreesFahrenheit) {
    let celsius = self._convertToCelsius(degreesFahrenheit)
    let response = await TeslaManager.carTemperatureCommand(car, celsius)
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

  _convertToFahrenheit(degreesCelsius) {
    return (degreesCelsius * (9/5)) + 32
  },

  _convertToCelsius(degreesFahrenheit) {
    return (degreesFahrenheit - 32) * (5/9)
  }
}
