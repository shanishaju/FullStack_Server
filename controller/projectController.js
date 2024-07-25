



exports.addProjectController = async(req,res)=>{
  console.log("inside add project controller");
  const userId = req.payload
  console.log(userId);
res.status(200).json('req recieved')
}





