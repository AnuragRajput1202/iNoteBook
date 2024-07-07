require('dotenv').config();
const mongoose = require('mongoose')
const mongoURI= process.env.MONGODB_URL

// connecting to database
const connectToDatabase = async ()=>{
    await mongoose.connect(mongoURI)
    console.log("connected to db")
}

module.exports=connectToDatabase