// 1 import express
const express = require ('express')


// import  user controller after creatning controller flder
const userController =require('./controller/userController')


//import project controller
const projectController = require('./controller/projectController')

//imort jwtcontroller
const jwt = require("./middleware/jwtMiddleware")
const multerConfig = require('./middleware/multerMiddleware');

// 2 create objecs for router class
const router = new express.Router()


// 3 set up path for each request from view

//register
router.post('/register',userController.registerController )


//Login
router.post('/login',userController.loginController)

//addproject
router.post('/addProject' ,jwt, multerConfig.single('proimg'), projectController.addProjectController)
// 4 export the Rputer
module.exports = router