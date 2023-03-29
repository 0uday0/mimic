let express = require("express")
const path = require("path")

let app = express()
let routes = require("./routes/routes")
let {db,connection} = require("./dbConnection/connection")


const { json } = require("express")

connection()
// let redisClient; 
// (async ()=>{
//   redisClient = redis.createClient(6379);
//   redisClient.on("error",(err)=>console.error(`Error: ${err}`))
//   await redisClient.connect()
// })()



app.listen(7000,()=>{
    console.log("server has started at 7000")
})
app.use(express.json())
app.post("/api/login",routes)





app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./views/index.html"))
})

app.get("/api/gotpeople",routes )

app.get("/api/gotpeople/:family",routes)

app.get("/api/search",routes)
