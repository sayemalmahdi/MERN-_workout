require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req, res, next) => {
   console.log(req.path, req.method)
   next()
})
  
// routes
app.use('/api/workouts', workoutRoutes)
  
// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  }) 

// I don't know how it works but I had to write the same code 2 times (connect to db) and then it works

  mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT)
    })
  })
  .catch((err) => {
    console.log(err)
  })