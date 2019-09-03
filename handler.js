'use strict'

const TeslaManager = require('./Managers/TeslaManager')
const Location = require('./Routes/Location')
const Climate = require('./Routes/Climate')

const GET_Routes = {
  car_location: Location.getAddress, //name in url payload: route path
  car_temp: Climate.getTemperature
}

const POST_Routes = {
  start_climate: Climate.startClimate,
  stop_climate: Climate.stopClimate
}

var self = module.exports = {
  async main(event, done) {

    //Validate request
    if(!self._validateHttpMethod(event.httpMethod)) done(new Error(`Unsupported http method "${event.httpMethod}".`))

    let params = {
      route: event.queryStringParameters.route,
      carName: event.queryStringParameters.vehicleName
    }

    let route = params.route
    if(!route) return done(new Error(`No route specified in query string, please specify a route.`))

    let carName = params.carName
    if(!carName) return done(new Error(`No vehicle name specified.`))

    let model3 = await self._getModel3(carName)

    if(!model3) return done(new Error(`Could not retrieve vehicle. Check vehicle name or tesla credentials.`))

    await self._wakeModel3(model3)

    if(!model3.isAwake) return done(new Error(`Unable to wake vehicle.`))

    // Do request
    switch (event.httpMethod) {
      case 'GET':
        if(GET_Routes.hasOwnProperty(route)) {
          let resp = await GET_Routes[route](model3)
          if(!resp) return done(new Error(`Unable to retrieve vehicle data.`))
          return done(null, resp)
        }
      case 'POST':
        if(POST_Routes.hasOwnProperty(route)) {
          let resp = await POST_Routes[route](model3, event.body)
          if(!resp) return done(new Error(`Unable to send vehicle command.`))
          return done(null, resp)
        }
      default:
        return done(new Error(`Specified route does not exist.`))
    }
  },

  _validateHttpMethod(method) {
    if( method == 'GET'  ||  method == 'POST') {
      return true
    }
    return false
  },

  async _getModel3(name) {
    let model3 = await TeslaManager.getCarByName(name)
    if(!model3) return null
    return model3
  },

  async _wakeModel3(model3) {
    await TeslaManager.wakeCarCommand(model3)
  },

}
