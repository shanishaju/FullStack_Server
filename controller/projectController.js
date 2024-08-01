const projects = require("../modal/projectModel");

exports.addProjectController = async (req, res) => {
  console.log("inside the addprojectcontroller");
  const userId = req.payload;
  console.log(userId);
  const { title, language, github, website, overview } = req.body;
  const proimg =
    req.file
      .filename; /* filename is used because we need filename saved in the server not the original name */
  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res.status(401).json("Project already exists");
    } else {
      const newProject = new projects({
        title,
        language,
        github,
        website,
        overview,
        proimg,
        userId,
      });
      await newProject.save();
      res.status(200).json("Project added successfully");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//all projects
exports.getAllProjectsController = async (req, res) => {
  const searchKey = req.query.search;
  console.log(searchKey);
  try {
    const query = {
      language: { $regex: searchKey, $options: "i" },
    };
    const allProjects = await projects.find(query);
    if (allProjects) {
      res.status(200).json(allProjects);
    } else {
      res.status(406).json("No Project");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
//home page 3 projects display

exports.homeProjectsController = async (req, res) => {
  // const searchKey =req.query.search
  // console.log(searchKey);
  try {
    const homeProjects = await projects.find().limit(3);
    res.status(200).json(homeProjects);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.userProjectController = async (req, res) => {
  const userId = req.payload;
  console.log(userId);
  try {
    const userProject = await projects.find({ userId });
    if (userProject) {
      res.status(200).json(userProject);
    } else {
      res.status(406).json("no project added yet");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
// User controller for deleting project using deleteone-return true or false
exports.deleteProjectController = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  // console.log(req.params);
  try {
    const deleteProject = await projects.findByIdAndDelete({
      _id: id,
    }); /* deleteone returns boolean values */
    /* findByIdAndDelete - document */
    res.status(200).json(deleteProject);
  } catch (err) {
    res.status(402).json(err);
  }
};


exports.editProjectController =async(req,res)=>{
  const { id } = req.params
  const userId = req.payload
  const { title, language, github, website, overview, proimg } = req.body;
  const uploadImage = req.file? req.file.filename:proimg
  
  try {
    const existingProject = await projects.findByIdAndUpdate({_id:id},{
      title,language,github,website,overview,proimg:uploadImage,userId
    })
    await existingProject.save()
    res.status(200).json(existingProject)

  } catch (error) {
    res.status(402).json(error);
  }

}