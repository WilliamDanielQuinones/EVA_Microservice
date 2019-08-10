'use strict'

let manager = require('./Managers/routeManager')

module.exports = {
  handleRoute(event, done) {
    switch (event.httpMethod) {
      case 'DELETE':
          //dynamo.deleteItem(JSON.parse(event.body), done);
          console.log('delete')
          break;
      case 'GET':
          manager.get(event.queryStringParameters.route, event.queryStringParameters.params)
          //dynamo.scan({ TableName: event.queryStringParameters.TableName }, done);
          console.log('GET')
          break;
      case 'POST':
          //dynamo.putItem(JSON.parse(event.body), done);
          console.log('POST')
          break;
      case 'PUT':
          //dynamo.updateItem(JSON.parse(event.body), done);
          console.log('PUT')
          break;
      default:
          done(new Error(`Unsupported method "${event.httpMethod}"`));
    }
  }
}
