const express=require('express');
const router=express.Router();

//Define routes
router.get('/users',(req,res)=>{
    res.json({message:'Fetching all users!'});
});

router.post("/users",(req,res)=>{
    const user =req.body;
    res.json({message:"User Created!",user});

});
module.exports=router;