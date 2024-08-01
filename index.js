const express = require('express')
const mongoose = require('mongoose')
const dotEnv = require('dotenv')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const authRouter = require('./Routes/AuthRouter')
const productRouter = require('./Routes/ProductRouter')

dotEnv.config()

const PORT = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())

app.use('/auth', authRouter)
app.use('./products', productRouter)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected successfully")
})
.catch((error)=>{
    console.log("Error: ", error)
})

app.listen(PORT, ()=>{
    console.log(`Server is running and started at ${PORT}`)
})