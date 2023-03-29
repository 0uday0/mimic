let jwt = require("jsonwebtoken")
function tokenAuthentication (request,response,next) {
    let jwToken 
    const authHeader = request.headers["authorization"]
    
    if (authHeader !== undefined) {
      jwToken = authHeader.split(" ")[1]
      
    }
    
    if (jwToken === undefined) {
      response.status(401)
      response.send("Invalid JW Token")
    } else {
      
      jwt.verify(jwToken,"loop", async (err,payload)=>{
        if (err) {
          console.log(err)
          response.status(401)
          response.send("Invalid JWT Token")
        } else {
          
          next()
        }
      })
    }
  }

  module.exports = tokenAuthentication