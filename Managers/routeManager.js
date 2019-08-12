'use strict'

let Location = require('../Routes/Get/Location')

const routesDictionary = {
  car_location: Location.GPSCoordinates //name in payload: route name
}

module.exports = {
  async get(route, params) {
    if(routesDictionary.hasOwnProperty(route)) {
      let resp = routesDictionary[route](params)
      return resp
    }
    return null
  },

  post(route, params) {

  },

  put(route, params) {

  },

  delete(route, params) {

  }
}
