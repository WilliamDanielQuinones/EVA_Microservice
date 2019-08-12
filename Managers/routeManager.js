'use strict'

let location = require('../Routes/Get/location')
let ssm = require('../Services/ssmService')
let teslaService = require('../Services/teslaService')
//name in payload: route name
const routesDictionary = {
  car_location: location.GPSCoordinates
}

module.exports = {
  async get(route, params) {
    if(routesDictionary.hasOwnProperty(route)) {
      //login
      //grab ssm params for token
      let ssmParam = await ssm.getSsmParameters(['teslaAccountSSMParam', 'teslaClientSSMParam'])

      let accessToken = await teslaService.getAccessToken(JSON.parse(ssmParam.Parameters[0].Value), JSON.parse(ssmParam.Parameters[1].Value))

      console.log(accessToken)

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
