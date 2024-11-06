//class 26-07-24 -multer
// multer
// 1) import multer
const multer = require('multer')

// 2) Store file
const storage = multer.diskStorage({
    //3)  where the file is stored
    destination:(req,file,callback)=>{
        callback(null,'./uploads') /* path in which file is stored * create folder  */
    },

    //4)  by which name the file should be stored
    filename:(req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}` /* format of storing the filename */
        callback(null,filename) /* Setting file name */
    }
})

// File filtering 
const fileFilter = (req,file,callback)=>{
    //logic
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg'){
        callback(null,true)
    }else{
        callback(null, false)
        return callback(new Error('only image file formats are accepted'))
    }
}

const multerConfig = multer ({
    storage,
    fileFilter,
})

module.exports = multerConfig