// import mongoose 
const mongoose = require('mongoose')

const connectingString =process.env.DATABASE

mongoose.connect(connectingString).then(()=>{
    console.log("mongo db connected sucessfully");
}).catch((err)=>{
    console.log(`not connected due to ${err}`);
})