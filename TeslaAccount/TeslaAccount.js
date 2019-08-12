'use strict'

module.exports = class TeslaAccount {
  constructor(account) {
    this.email = account.email
    this.password = account.password
    this.clientId = account.clientId
    this.clientSecret = account.clientSecret
  }

  convertToJson() {
    return {
      email: this.email,
      password: this.password,
      client_id: this.clientId,
      client_secret: this.clientSecret
    }
  }
}
