'use strict'

let manager = require('./Managers/RouteManager')

module.exports = {
  async handleRoute(event, done) {
    switch (event.httpMethod) {
      case 'DELETE':
          break;
      case 'GET':
          await manager.get(event.queryStringParameters.route, event.queryStringParameters.params)
          break;
      case 'POST':
          //JSON.parse(event.body)
          break;
      case 'PUT':
          break;
      default:
          done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
  }
}
