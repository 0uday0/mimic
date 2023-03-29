
let redisClient = require("../redis/redis")
let {db,connection} = require("../dbConnection/connection")
async function totalMembers (req,res) {
    let sqlQuery = `SELECT DISTINCT name,description,image,wikiLink FROM gotPeople`
    let gotPeople = await redisClient.get("total")
    
    if (gotPeople) {
      console.log("coming from redis")
      res.send(JSON.parse(gotPeople))
    } else {
      db.query(sqlQuery,async(err,result)=>{
        if(err) {
          console.log(err)
        } else {
          
           redisClient.set("total",JSON.stringify(result))
          res.send(result)
        }
      })
  
    }
}

module.exports = totalMembers

