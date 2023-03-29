let {db,connection} = require("../dbConnection/connection")
let redisClient = require("../redis/redis")
async function search (req,res){
    let searchQuery = req.query.query
    let sqlQuery = `SELECT DISTINCT name,description,image,wikiLink FROM gotPeople
                    WHERE name LIKE ?`
    let gotPeople = await redisClient.get("total")
    if (gotPeople) {
      let everyone = JSON.parse(gotPeople)
      console.log(everyone)
      let result = everyone.filter((person)=>{
       return  person.name.toLowerCase().includes(searchQuery.toLowerCase())
      })
      console.log("from redis")
      res.send(result)
  
    } else {
      db.query(sqlQuery,[`%${searchQuery}%`],(err,result)=>{
        if(err) {
          console.log(err)
        } else {
          res.send(result)
        }
      })
    }
    
  }
  module.exports = search