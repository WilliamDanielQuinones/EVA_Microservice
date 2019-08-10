'use strict'
import axios from 'axios'

const teslaURL = 'https://owner-api.teslamotors.com'

modules.export = {
  getAccessToken() {
    const tokenPath = '/oauth/token'
  },

  revokeAccessToken() {
    const revokeTokenPath = '/oauth/revoke'
  }
}
