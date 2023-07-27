
require('dotenv').config()

//importing the express package
const express = require("express");
const mongoose = require("mongoose")

const workoutRoutes = require("./routes/workouts.routes");

//creating express app
const app = express();

//middleware to parse incoming requests with JSON payloads
app.use(express.json())

//middleware to log out request method and path
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//connect to the db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //Listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}`)
        })
    })
    .catch((error) => console.log(error))

//routes
app.use('/api/workouts', workoutRoutes)