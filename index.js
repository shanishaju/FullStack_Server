//import dotenv - to load envronment variables
require ('dotenv').config()

//import express
const  express = require('express')

//import cors
const cors = require('cors')

//import appmiddleware
// const app = require('./middleware/appMiddleware')

//after creating routes file... import the router
const router = require('./routes')

//import connection.js
require('./connection')

//create express server
const psServer = express()

//use of cors to communicate with the view
psServer.use(cors())

//use json method - returns a middle ware which can pass  json
psServer.use(express.json())

// use appMW
// psServer.use(app)

//use router
psServer.use(router)

//to exprt folder from the server side to use in the client side 
//first argument sgould the name in which we are using the folder in the client side
//sec arg- static method to export the folder
//static methd should have path of the export folder
psServer.use('/uploads',express.static('./uploads'))

//set port for server
PORT = 4000 || process.env.PORT

//listen to the port  - to  resolve the request
psServer.listen(PORT,()=>{
    console.log(`server running successfully at the port number: ${PORT}`);
})

//get request
// psServer.get('/',(req,res)=>{
//     //logics
//     res.send('get request recieved')
// })
 

//post request
// psServer.post('/',(req,res)=>{
//     //logics
//     res.send('post request recieved')
// })

//put request
// psServer.put('/',(req,res)=>{
//     //logics
//     res.send('put request recieved')
// })

//we are using mvc 