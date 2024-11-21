const users = require("../modal/userModal");

const jwt = require("jsonwebtoken");

//register

exports.registerController = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  // res.status(200).json('register requeest recieved')
  try {
    const exsistingUser = await users.findOne({ email });
    if (exsistingUser) {
      res.status(406).json("Account Already Exist");
    } else {
      const newUser = new users({
        username,
        email,
        password,
        github: "",
        linkedin: "",
        profile: "",
      });
      //save() method used to store in mongodb
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    res.status(401).json(`registration failed due to ${error} `);
  }
};

//login
exports.loginController = async (req, res) => {
  console.log("inside log completed");
  const { email, password } = req.body;
  try {
    const exsistingUser = await users.findOne({ email, password });
    if (exsistingUser) {
      //token generating 
      const token = jwt.sign({ userId: exsistingUser._id }, "secretKey");
     //send datas to frontend as object for more clarity
      res.status(200).json({ exsistingUser, token });
    } else {
      res.status(406).json("Invalid Username or Password");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};


//edit
exports.editProfileController = async (req, res) => {

  const userId =req.payload
  const { username, email, password ,github,linkedin,profile} = req.body
  const prifileimg = req.file? req.file.filename:profile
  try {
    const userProfile = await users.findByIdAndUpdate({ _id:userId },{username,email,password,github,linkedin,profile:prifileimg},{new:true})
    await userProfile.save()
    res.status(200).json(userProfile);

    
  } catch (error) {
    res.status(401).json(error);
  }
};