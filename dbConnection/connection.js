let mysql = require("mysql")

const db = mysql.createConnection({host: 'localhost',
user     : 'me',
password : '',
database: 'hell'
} 
)
function connection(){
    db.connect((err)=>{
        if(err){
            throw(err)
        } else {
            console.log("MySql got connected")
        }
    })
}

module.exports = {db,connection}