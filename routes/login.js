const express= require('express');
const router=express.Router();
const Login=require('../models/Login');

router.get('/',(req,res)=>{
    console.log(req.body);
    const login=Login(req.body);
    login.save();
    res.send(req.body);
    
})

module.exports = router;
