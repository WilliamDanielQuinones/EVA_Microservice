'use strict'

const ENDPOINTS = require('../TeslaEndpoints').ENDPOINTS
const axios = require('axios')
const JSONbig = require('json-bigint')

const BASE_URL = 'https://owner-api.teslamotors.com/'

module.exports = {
  //Authorization
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


  async getVehicles(accessToken) {
    const url = BASE_URL + ENDPOINTS.VEHICLE_LIST.URI
    try{
      let resp = await axios.get(url, {
        headers: {'Authorization': "bearer " + accessToken.accessToken},
        transformResponse: data => JSONbig.parse(data)
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  // State
  async getVehicle(id, accessToken) {
    const url = BASE_URL + this.convertUri(id, ENDPOINTS.VEHICLE_SUMMARY.URI)
    try{
      let resp = await axios.get(url, {
        headers: {'Authorization': "bearer " + accessToken.accessToken},
        transformResponse: data => JSONbig.parse(data)
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  async getDriveState(id, accessToken) {
    const url = BASE_URL + this.convertUri(id, ENDPOINTS.DRIVE_STATE.URI)
    try{
      let resp = await axios.get(url, {
        headers: {'Authorization': "bearer " + accessToken.accessToken}
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  async getClimateState(id, accessToken) {
    const url = BASE_URL + this.convertUri(id, ENDPOINTS.CLIMATE_STATE.URI)
    try{
      let resp = await axios.get(url, {
        headers: {'Authorization': "bearer " + accessToken.accessToken}
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  async getChargeState(id, accessToken) {
    const url = BASE_URL + this.convertUri(id, ENDPOINTS.CHARGE_STATE.URI)
    try{
      let resp = await axios.get(url, {
        headers: {'Authorization': "bearer " + accessToken.accessToken}
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  // Commands
  async wakeUp(id, accessToken) {
    const url = BASE_URL + this.convertUri(id, ENDPOINTS.WAKE_UP.URI)
    try{
      let resp = await axios.post(url, {},{
        headers: {'Authorization': "bearer " + accessToken.accessToken}
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  async setTemperature(id, temperature, accessToken) {
    const url = BASE_URL + this.convertUri(id, `${ENDPOINTS.CHANGE_CLIMATE_TEMPERATURE_SETTING.URI}?
                                                  driver_temp=${temperature}&passenger_temp=${temperature}`)
    try{
      let resp = await axios.post(url, {},{
        headers: {'Authorization': "bearer " + accessToken.accessToken}
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  async startHVAC(id, accessToken) {
    const url = BASE_URL + this.convertUri(id, ENDPOINTS.CLIMATE_ON.URI)
    try{
      let resp = await axios.post(url, {},{
        headers: {'Authorization': "bearer " + accessToken.accessToken}
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  async stopHVAC(id, accessToken) {
    const url = BASE_URL + this.convertUri(id, ENDPOINTS.CLIMATE_OFF.URI)
    try{
      let resp = await axios.post(url, {},{
        headers: {'Authorization': "bearer " + accessToken.accessToken}
      })
      if (resp) return resp.data.response
    } catch (error) {
        return null
    }
  },

  // Helpers
  // Convert uris from endpoint file
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
