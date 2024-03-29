var aws = require('aws-sdk')

var ssm = new aws.SSM()

module.exports = {
  async getSsmParameter(key) {
    let payload = {
      Name: key,
      WithDecryption: true
    }
    const response = await ssm.getParameter(payload).promise()
    if(!response) {
      return null
    }
    return JSON.parse(response.Parameter.Value)
  },

  async getSsmParameters(keys) {
    let payload = {
      Names: keys,
      WithDecryption: true
    }
    const response = await ssm.getParameters(payload).promise()
    if(!response) {
      return null
    }
    let params = []
    for(let param of response.Parameters) {
      params.push(JSON.parse(param.Value))
    }
    return params
  }
}
