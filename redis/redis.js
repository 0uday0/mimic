const redis = require("redis")
const redisConnection = ()=>{
    let redisClient; 
(async ()=>{
  redisClient = redis.createClient(6379);
  redisClient.on("error",(err)=>console.error(`Error: ${err}`))
  await redisClient.connect()
})()
return redisClient
}

let redisClient = redisConnection()


module.exports = redisClient