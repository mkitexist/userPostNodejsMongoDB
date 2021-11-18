const express=require("express");
const router=express.Router();
const userControl=require("../controllers/user");
router.post("/signup",userControl.createUser);
router.post("/login",userControl.userLogin)
module.exports=router;
