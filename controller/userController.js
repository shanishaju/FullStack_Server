//register

exports.registerController=(req,res)=>{

       const {username , email , password}= req.body
       console.log(username, email, password);

       res.status(200).json('register requeest recieved')
}