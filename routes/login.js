const express= require('express');
const router=express.Router();
const Login=require('../models/Login');
const { body, validationResult } = require('express-validator');
const bodyParser=require('body-parser');
const bcrypt = require('bcryptjs')


router.post('/createadmin',bodyParser.json(),[
    body('email','Enter a valid Email').isEmail(),
     body('password','Enter a valid Password').isLength({min: 8}),
],async (req,res)=>{
    //if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check weather the admin with this email exists
    try{

      let login =await Login.findOne({email: req.body.email});
       if(login){
       return res.status(400).json({error: "sorry a admin with this email exits"})
      }
      const salt=await bcrypt.genSalt(10);
      secPass= await bcrypt.hash(req.body.password,salt);

      admin= await Login.create({
      email: req.body.email,
      password: secPass,
    })
    res.json(admin)
    }catch(error){
      console.error(error.message);
      res.status(500).send("Some error Occured");
    }
})

module.exports = router;
