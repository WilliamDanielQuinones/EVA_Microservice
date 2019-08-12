'use strict'

let ssm = require('../Services/SsmService')
let TeslaService = require('../Services/TeslaService')
let AccessToken = require('../AccessToken/AccessToken')
let TeslaAccount = require('../TeslaAccount/TeslaAccount')

module.exports = {
  async getAuthToken() {
    let ssParam = await ssm.getSsmParameter('EVA_Microservice-teslaAccount')
    let account = new TeslaAccount(ssParam)
    let resp = await TeslaService.getAccessToken(account.convertToJson())
    return new AccessToken(resp)
  },

  async getCar(displayName, authToken) {
    let cars = await getAllCars(authToken)
    let car = cars.find((car) => {
      if(car.Id == displayName) {
        return true
      }
    })

    return car.id
  },

  async getAllCars(authToken) {
    return await TeslaService.getVehicles(authToken)
  }
}
