'use strict'

let TeslaManager = require('../Managers/TeslaManager')

let self = module.exports = {
  async getTemperature(car) {
    let climateState = car.getClimateState()
    if(!climateState) await TeslaManager.setCarClimateState(car)

    let internalTemp = climateState.insideTemp
    return {internalTemp: internalTemp}
  },
}
