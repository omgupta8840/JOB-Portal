import multer from "multer";


// const storage = multer.memoryStorage();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './ResumeUploads')
  },
  filename: function (req, file, cb) {
    return cb(null,`${Date.now()}-${file.originalname}`)
  }
})
export const singleUpload = multer({storage}).single("file");