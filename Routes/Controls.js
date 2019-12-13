'use strict'

let TeslaManager = require('../Managers/TeslaManager')

let self = module.exports = {
  async openFrunk(car) {
    let resp = TeslaManager.openFrunk(car)
    if(!resp)
      return false
    return true
  }
}
