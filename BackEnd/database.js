require('dotenv').config();
const mongoose = require('mongoose')
const mongoURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@cluster0.al1cjqn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

// connecting to database
const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoURI)
        console.log("connected to db")
    } catch (error) {
        console.error(error)
    }

}

module.exports = connectToDatabase