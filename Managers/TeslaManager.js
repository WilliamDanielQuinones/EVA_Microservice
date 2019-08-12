'use strict'

let ssm = require('../Services/SsmService')
let TeslaService = require('../Services/TeslaService')
let AccessToken = require('../AccessToken/AccessToken')
let TeslaAccount = require('../TeslaAccount/TeslaAccount')

module.exports = {
  async getAccessToken() {
    let ssParam = await ssm.getSsmParameter('EVA_Microservice-teslaAccount')
    let account = new TeslaAccount(ssParam)
    let resp = await TeslaService.getAccessToken(account.convertToJson())
    return new AccessToken(resp)
  }
}
