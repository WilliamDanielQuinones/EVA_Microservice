'use strict'

let ssm = require('../Services/SsmService')
let TeslaService = require('../Services/TeslaService')
let AccessToken = require('../TeslaAccount/AccessToken')
let TeslaAccount = require('../TeslaAccount/TeslaAccount')
let Model3 = require('../Model3/Model3')

let self = module.exports = {
  async getAccessToken() {
    let ssParam = await ssm.getSsmParameter('EVA_Microservice-teslaAccount')
    let account = new TeslaAccount(ssParam)
    let resp = await TeslaService.getAccessToken(account.convertToJson())
    if(!resp) return null
    return new AccessToken(resp)
  },

  async getCarByName(name, accessToken) {
    if(!accessToken) {
      accessToken = await self.getAccessToken()
    }
    let cars = await this.getAllCars(accessToken)
    let car = cars.find((car) => {
      if(car.displayName == name) {
        return true
      }
    })
    return car
  },

  async getCarById(id, accessToken) {
    if(!accessToken) {
      accessToken = await self.getAccessToken()
    }
    let response = await TeslaService.getVehicle(id, accessToken)
    return new Model3(response, accessToken)
  },

  async getAllCars(accessToken) {
    if(!accessToken) {
      accessToken = await self.getAccessToken()
    }
    let response = await TeslaService.getVehicles(accessToken)
    let cars = response.map((vehicle) => {
      return new Model3(vehicle, accessToken)
    })
    return cars
  },

  async wakeCarCommand(car) {
    let response = await TeslaService.wakeUp(car.id, car.accessToken)
    if(!response) return null
    car.wakeUp()
  },

  async getCarDriveState(car) {
    let response = await TeslaService.getDriveState(car.id, car.accessToken)
    if(!response) return null
    car.setDriveState(response)
  },

  async getCarClimateState(car) {
    let response = await TeslaService.getClimateState(car.id, car.accessToken)
    if(!response) return null
    car.setClimateState(response)
  },

  async carTemperatureCommand(car, temperatureCelsius) {
    let response = await TeslaService.setTemperature(car.id, temperatureCelsius, car.accessToken)
    if(!response) return false
    return true
  },

  async startHVACCommand(car) {
    let response = await TeslaService.startHVAC(car.id, car.accessToken)
    if(!response) return false
    return true
  },

  async stopHVACCommand(car) {
    let response = await TeslaService.stopHVAC(car.id, car.accessToken)
    if(!response) return false
    return true
  }
}
