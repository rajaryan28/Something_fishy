const mongoose = require('mongoose')
const mongoURI="mongodb://localhost:27017/Something_fishy"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>console.log("Connected to mongos")).catch((e)=>console.log(e.message))
}

module.exports = connectToMongo;

