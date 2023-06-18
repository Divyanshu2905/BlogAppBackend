const router=require("express").Router();
const dotenv=require("dotenv");
const cloudinary=require('cloudinary').v2;
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


router.post("/", async(req,res)=>{
    const newPhoto=req.body;
    console.log(newPhoto);
    try{
        const savedPhoto=cloudinary.uploader.upload(newPhoto.file);
        res.status(200).json(savedPhoto);
        console.log(savedPhoto);
    }catch(err){console.log(err)}
})

module.exports=router;