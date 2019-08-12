'use strict'

const ENDPOINTS = require('../teslaEndpoints').ENDPOINTS
const axios = require('axios')

const BASE_URL = 'https://owner-api.teslamotors.com/'

module.exports = {
  async getAccessToken(account, client) {
    const tokenUrl = BASE_URL + ENDPOINTS.AUTHENTICATE.URI
    let payload = {
      email: account.email,
      password: account.password,
      client_id: client.clientId,
      client_secret: client.clientSecret,
      grant_type: 'password'
    }
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
