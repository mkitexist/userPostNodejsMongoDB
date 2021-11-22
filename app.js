const express=require('express');
const app=express();
const mongoose=require("mongoose")
const bodyParser=require('body-parser');
const cors=require("cors");
const postsRoutes=require("./routes/posts");
const usersRoutes=require("./routes/user");
const path=require("path");
mongoose.connect("mongodb+srv://chethan:skaUWBAEi6ni14Lb@cluster0.9dogs.mongodb.net/AngularNodeMongodb?retryWrites=true&w=majority").then(()=>{
    console.log("connected to databse");
}).catch(()=>{
    console.log("eroor occured while connected");
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("images",express.static(path.join("images")));
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Acess-Control-Allow-Headers",
//     "Origin,X-Requested-With,Content-Type,Accept");
//     res.setHeader("Acess-Control-allow-Methods",
//     "GET,POST,PATCH,DELETE,PUT,OPTIONS");
//     next();
// })

app.use("/api/posts",postsRoutes);
app.use("/api/users",usersRoutes);

module.exports=app;
/////////////////////////////
