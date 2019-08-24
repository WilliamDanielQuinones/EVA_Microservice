'use strict'

const TeslaManager = require('./Managers/TeslaManager')
const Location = require('./Routes/Location')
const Climate = require('./Routes/Climate')

const GET_Routes = {
  car_location: Location.getAddress, //name in payload: route path
  car_temp: Climate.getTemperature
}

const POST_Routes = {

}

const PUT_Routes = {

}

var self = module.exports = {
  async main(event, done) {

    //Validate request
    if(!self._validateHttpMethod(event.httpMethod)) done(new Error(`Unsupported http method "${event.httpMethod}"`))

    let params = {
      route: event.queryStringParameters.route,
      carName: event.queryStringParameters.vehicleName
    }

    let route = params.route
    if(!route) return done(new Error(`No route specified in query string, please specify a route`))

    let carName = params.carName
    if(!carName) return done(new Error(`No vehicleName specified`))


    // Initialize and wake car
    let model3 = await self._initCar(carName)


    // Do request
    switch (event.httpMethod) {
      case 'GET':
        if(GET_Routes.hasOwnProperty(route)) {
          let resp = await GET_Routes[route](model3)
          if(!resp) return done(new Error(`Fail`))
          return done(null, resp)
        }
      case 'POST':
        if(POST_Routes.hasOwnProperty(route)) {
          let resp = await POST_Routes[route](model3, event.body)
          if(!resp) return done(new Error(`Fail`))
          return done(null, resp)
        }
      case 'PUT':
        if(POST_Routes.hasOwnProperty(route)) {
          let resp = await PUT_Routes[route](model3, event.body)
          if(!resp) return done(new Error(`Fail`))
          return done(null, resp)
        }
      default:
        return done(new Error(`Specified route does not exist`))
    }
  },

  _validateHttpMethod(method) {
    if( method == 'GET'  ||
        method == 'POST' ||
        method == 'PUT') {
      return true
    }
    return false
  },

  async _initCar(name) {
    let model3 = await TeslaManager.getCarByName(name)
    if(!model3) return null
    await model3.wakeUp()
    return model3
  }
}



