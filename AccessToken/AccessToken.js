'use strict'

module.exports =  class AccessToken {
    constructor(token) {
      this.accessToken = token.access_token
      this.tokenType = token.token_type
      this.expiresIn = token.expires_in
      this.refreshToken = token.refresh_token
      this.createdAt = token.created_at
    }
}
