'use strict'

let ssm = require('../Services/SsmService')
let TeslaService = require('../Services/TeslaService')
let AccessToken = require('../AccessToken/AccessToken')
let TeslaAccount = require('../TeslaAccount/TeslaAccount')
let Model3 = require('../Model3/Model3')

module.exports = {
  async getAuthToken() {
    let ssParam = await ssm.getSsmParameter('EVA_Microservice-teslaAccount')
    let account = new TeslaAccount(ssParam)
    let resp = await TeslaService.getAccessToken(account.convertToJson())
    return new AccessToken(resp)
  },

  async getCarByName(query, authToken) {
    let cars = await this.getAllCars(authToken)
    let car = cars.find((car) => {
      if(car.displayName == query) {
        return true
      }
    })
    return car
  },

  async getCarById(query, authToken) {
    let response = await TeslaService.getVehicle(query, authToken)
    return new Model3(response)
  },

  async getAllCars(authToken) {
    let response = await TeslaService.getVehicles(authToken)
    let cars = response.map((vehicle) => {
      return new Model3(vehicle)
    })
    return cars
  }
}
