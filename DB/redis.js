const redis = require('redis')

const {RADIS_CONFIG} = require('../config/db')

//创建客户端
const redisClient = redis.createClient(RADIS_CONFIG)
redisClient.on('error', err => {
  console.log(err)
})

module.exports =redisClient
