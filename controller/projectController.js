const projects = require('../modal/projectModel')

exports.addProjectController = async(req,res)=>{
    console.log('inside the addprojectcontroller');
    const userId = req.payload
    console.log(userId);
    const{title, language, github, website, overview} = req.body
    const proimg = req.file.filename /* filename is used because we need filename saved in the server not the original name */
    try {
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(401).json('Project already exists')
        }else{
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                proimg,
                userId
            })
            await newProject.save()
            res.status(200).json(newProject)
            
        }
            
    } catch (error) {
            res.status(401).json(error)
        
    }
  
}