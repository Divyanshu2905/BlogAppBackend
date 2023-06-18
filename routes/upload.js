const router=require("express").Router();
const dotenv=require("dotenv");
const cloudinary=require('cloudinary').v2;
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})


router.put("/", async(req,res)=>{
    const newPhoto=req.body;
    try{
        const savedPhoto=cloudinary.uploader.upload(newPhoto.file);
        res.status(200).json(savedPhoto);
    }catch(err){console.log(err)}
})

module.exports=router;