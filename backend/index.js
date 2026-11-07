// 1. import packages
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const routes = require('./routes/allRoutes')
require('./config/db')

// 2. create server
const bookServer = express()

// 3. middlewares
bookServer.use(cors())
bookServer.use(express.json())

// 4. test route
bookServer.get('/',(req,res)=>{
    res.status(200).send('<h1>Book Server Started and waiting for request !!!!</h1>')
})

// 5. use routes
bookServer.use(routes)

// 6. global error handler
bookServer.use((err,req,res,next)=>{
    console.log(err);
    res.status(500).json(err.message)
})

// 7. start server
const PORT = process.env.PORT || 3000
bookServer.listen(PORT,()=>{
    console.log(`Book Server Started at port ${PORT}.....`);
})
