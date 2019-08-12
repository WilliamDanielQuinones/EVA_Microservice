'use strict'

const ENDPOINTS = require('../TeslaEndpoints').ENDPOINTS
const axios = require('axios')

const BASE_URL = 'https://owner-api.teslamotors.com/'

module.exports = {
  async getAccessToken(payload) {
    const tokenUrl = BASE_URL + ENDPOINTS.AUTHENTICATE.URI
    payload.grant_type = 'password'

    try{
      let resp = await axios.post(tokenUrl, payload)
      if (resp) return resp.data
    } catch (error) {
        return null
    }
  },

  async revokeAccessToken() {
    const revokeTokenUrl = BASE_URL + ENDPOINTS.REVOKE_AUTH_TOKEN.URI
  },

  async getVehicles(authToken) {
    const authTokenUrl = BASE_URL + ENDPOINTS.VEHICLE_LIST.URI
    try{
      let resp = await axios.post(authTokenUrl, {}, {
        headers: {'Authorization': "bearer " + authToken.accessToken}
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  async getVehicleId() {

  }
}
