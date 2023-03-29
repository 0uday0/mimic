let bcrypt = require("bcrypt")

let jwt = require("jsonwebtoken")
let redisClient = require("../redis/redis")
let {db,connection} = require("../dbConnection/connection")

const loginHandler = (req,response)=>{
    let {username, password} = req.body
    console.log(req.body)
    
    let userQuery = `SELECT * FROM users
                      WHERE email = ?`
    
    db.query(userQuery,[username],async (err,res)=>{
        let userToken = await redisClient.get(username+password)
      if (err) {
        console.log(err)
      }
      else if (userToken) {
        console.log("json token coming from redis cache")
        response.status(200).json(JSON.parse(userToken))
      }
       else {
        
        if(res.length == 0 ) {
          response.status(404)
          response.send(false)
        } else {
          const matched = await bcrypt.compare(password,res[0].password)
          if (matched) {
            const jsonToken  =  jwt.sign({userID:res[0].id},"loop")
            // const cachedToken = await redisClient.get(webToken)
            // if (!cachedToken) {
            //   await redisClient.set(webToken,JSON.stringify(jsonToken))
            // }
            await redisClient.set(username+password,JSON.stringify(jsonToken))
            
            response.status(200).json(jsonToken)
            
          } else {
            response.status(400)
            response.send(false)
          }
        }
      }
    })
  }
  
  module.exports = loginHandler