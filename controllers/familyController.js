let redisClient = require("../redis/redis")
let {db,connection} = require("../dbConnection/connection")
async function family (req,res){
    let familyName = req.params.family.slice(0,-1)
    console.log(typeof familyName)
    let sqlQuery = `SELECT DISTINCT name,description,image,wikiLink FROM gotPeople
                    WHERE name LIKE ? `
    let family = await redisClient.get(familyName)
    if (family) {
      res.send(JSON.parse(family))
    } else {
      db.query(sqlQuery,[`%${familyName}%`],async (err,result)=>{
        if(err) {
          console.log(err)
        } else {
          await redisClient.set(familyName,JSON.stringify(result))
          res.send(result)
        }
      })
    }
    
  }
module.exports = family