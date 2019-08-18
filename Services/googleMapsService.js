'use strict'

const google = require('@google/maps')
const ssm = require('./SsmService')

  module.exports = {
    async initClient() {
      let ssParam = await ssm.getSsmParameter('EVA_Microservice-googleMapsKey')
      return google.createClient({
        key: ssParam.key,
        Promise: Promise,
      })
    },

    async getAddressFromCoordinates(googleMapsClient, latitude, longitude) {
      let response = await googleMapsClient.reverseGeocode({
        latlng: [parseFloat(latitude), parseFloat(longitude)]
      }).asPromise()

      if(!response) {
        return null
      }

      return response.json.results[0].formatted_address
    }
}
