const express = require('express')
const dotEnv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./routes/userRoutes')
const cors = require('cors')

dotEnv.config()
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDb Connected")
})
.catch((e) => {
    console.log("Error: ",e)
})

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api', router)


const PORT = 5000

app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})