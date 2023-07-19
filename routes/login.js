const express= require('express');
const router=express.Router();
const Login=require('../models/Login');
const { body, validationResult } = require('express-validator');
const bodyParser=require('body-parser');

router.post('/',bodyParser.json(),[
    body('email','Enter a valid Email').isEmail(),
     body('password','Enter a valid Password').isLength({min: 8}),
],async (req,res)=>{
    //if there are errors,return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check weather the admin with this email exists
    let login =await Login.findOne({email: req.body.email});
    if(login){
       return res.status(400).json({error: "sorry a admin with this email exits"})
    }
    admin= await Login.create({
      email: req.body.email,
      password: req.body.password,
    })
    // .then(login => res.json(login))
    // .catch(err=>{console.log(err)
    // res.json({error:'Please enter a unique email id',message: err.message})})
    res.json({"Nice":"nice"})
})

module.exports = router;
