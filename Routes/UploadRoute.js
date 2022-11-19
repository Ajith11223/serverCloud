import express from 'express'
import multer from 'multer'
import PostModel from '../Models/postModal.js';
import cloudinaryUploadImg from '../utils/Cloudainary.js';

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log(req);
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });

router.post('/', upload.single("file"), async (req, res) => {
  console.log(req, "clod");

  try {
    // const localpath = `/public/images/${req.file.filename}`
    const localpath = req.file.path
    const imageLink = await cloudinaryUploadImg(localpath)
    console.log(imageLink.url, "jjddjjdjjdjdjjdjdjjjd");
    let newPost = new PostModel(req.body);
    newPost.image = imageLink.url
    const response = await newPost.save()
    return res.status(200).json({message:"file upload successfully", response})
  } catch (error) {
    console.log(error);
  }
})

export default router;