'use strict'

let Location = require('../Routes/Get/Location')
let TeslaManager = require('./TeslaManager')

const routesDictionary = {
  car_location: Location.GPSCoordinates //name in payload: route name
}

module.exports = {
  async get(route, params) {
    if(routesDictionary.hasOwnProperty(route)) {
      let token = await TeslaManager.getAccessToken()
    }
    let resp = routesDictionary[route](params)
    if(!resp) return null
    return resp
  },

  post(route, params) {

  },

  put(route, params) {

  },

  delete(route, params) {

  }
}
