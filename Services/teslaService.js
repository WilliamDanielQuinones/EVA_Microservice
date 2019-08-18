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
    const url = BASE_URL + ENDPOINTS.VEHICLE_LIST.URI
    try{
      let resp = await axios.get(url, {
        headers: {'Authorization': "bearer " + authToken.accessToken}
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  async getVehicle(id, authToken) {
    const url = BASE_URL + this.convertUri(id, ENDPOINTS.VEHICLE_SUMMARY.URI)
    try{
      let resp = await axios.get(url, {
        headers: {'Authorization': "bearer " + authToken.accessToken}
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  async wakeUp(id, authToken) {
    const url = BASE_URL + this.convertUri(id, ENDPOINTS.WAKE_UP.URI)
    try{
      let resp = await axios.get(url, {
        headers: {'Authorization': "bearer " + authToken.accessToken}
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  async getDriveState(id, authToken) {
    const url = BASE_URL + this.convertUri(id, ENDPOINTS.DRIVE_STATE.URI)
    try{
      let resp = await axios.get(url, {
        headers: {'Authorization': "bearer " + authToken.accessToken}
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  //helper function to translate uris from endpoint file
  convertUri(id, uri) {
    if(uri.includes('{vehicle_id}')) {
      return uri.replace('{vehicle_id}', id)
    }

    if(uri.includes('{site_id}')) {
      return uri.replace('{site_id}', id)
    }

    if(uri.includes('{battery_id}')) {
      return uri.replace('{battery_id}', id)
    }

    if(uri.includes('{message_id}')) {
      return uri.replace('{message_id}', id)
    }
  }
}
