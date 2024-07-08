const connectToDatabase = require('./database')
const express = require('express')
const cors = require('cors')
const app =express()
const port = process.env.PORT

const corsOptions = {
    origin: "https://inotebook-1-jrfp.onrender.com", // frontend URI (ReactJS)
}

app.use(cors(corsOptions))
app.use(express.json())

connectToDatabase()
//routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, ()=>{console.log("The app is running")})