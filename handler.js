'use strict'

let manager = require('./Managers/routeManager')

module.exports = {
  async handleRoute(event, done) {
    switch (event.httpMethod) {
      case 'DELETE':
          //dynamo.deleteItem(JSON.parse(event.body), done);
          break;
      case 'GET':
          await manager.get(event.queryStringParameters.route, event.queryStringParameters.params)
          //dynamo.scan({ TableName: event.queryStringParameters.TableName }, done);
          break;
      case 'POST':
          //dynamo.putItem(JSON.parse(event.body), done);
          break;
      case 'PUT':
          //dynamo.updateItem(JSON.parse(event.body), done);
          break;
      default:
          done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
  }
}
