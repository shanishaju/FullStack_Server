const users = require("../modal/userModal");

const jwt = require("jsonwebtoken")



//register


exports.registerController= async(req,res)=>{

       const {username , email , password}= req.body
       console.log(username, email, password);

       // res.status(200).json('register requeest recieved')
       try {
          const existingUser = await users.findOne({email})
           if(existingUser){
              res.status(406).json('Account Already Exist')
           }
           else{
              const newUser = new users({
                     username,
                     email,
                     password,
                     github:"",
                     linkedin:"",
                     profile:""
              })
              //save() method used to store in mongodb
              await newUser.save()
             res.status(200).json(newUser)

           }
              
       } catch (error) {
              res.status(401).json(`registration failed due to ${error} `)     
       }
}

//login
exports.loginController = async (req,res)=>{
       console.log('inside log completed');
       const {email, password}= req.body
       try {
              const existingUser =await users.findOne({email,password})
              if(existingUser){
                     //token
                     const token= jwt.sign({userId:existingUser._id},'secretKey')

                     res.status(200).json({existingUser,token})
              }
              else{
                  res.status(406).json("Invalid Username or Password")
              }
              
       } catch (error) {
              res.status(401).json(error)
              
       }

} 