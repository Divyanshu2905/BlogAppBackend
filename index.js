const express=require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const authRoute=require("./routes/auth")
const userRoute=require("./routes/users")
const postRoute=require("./routes/posts")
const catRoute=require("./routes/categories")
const path=require("path");
const multer=require("multer");
const cloudinary=require('cloudinary').v2;
dotenv.config();
const PORT=process.env.PORT;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
})
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")))
mongoose.connect(process.env.MONGO_URL).then(console.log("connected")).catch((err)=>console.log(err));
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name);
    },
})
// const upload=({storage:storage});
app.post("/api/upload",cloudinary.uploader.upload("file"),(req,res)=>{
   res.status(200).json("File Uploaded"); 
})

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/posts",postRoute);
app.use("/api/categories",catRoute);

app.use(express.static(path.join(__dirname, "/blog/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/blog/build', 'index.html'));
});

app.listen(PORT || 5000,()=>{
    console.log("server running")
})