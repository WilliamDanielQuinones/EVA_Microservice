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

  revokeAccessToken() {
    const revokeTokenUrl = BASE_URL + ENDPOINTS.REVOKE_AUTH_TOKEN.URI
  }
}
