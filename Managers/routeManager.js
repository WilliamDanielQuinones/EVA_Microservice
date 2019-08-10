'use strict'

let location = require('../Routes/Get/location')

//name in payload: route name
const routesDictionary = {
  car_location: location.GPSCoordinates
}

module.exports = {
  get(route, params) {
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
