const express= require('express');
const router=express.Router();
const Login=require('../models/Login');
const { body, validationResult } = require('express-validator');
const bodyParser=require('body-parser');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser=require('../middleware/fetchuser')

const JWT_SECRET="Anmaya$Tech";

//ROUTE 1: Create admin endpoint
router.post('/createadmin',bodyParser.json(),[
    body('username', 'Enter a valid name').isLength({ min: 5 }),
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
      const secPass= await bcrypt.hash(req.body.password,salt);

      admin= await Login.create({
      username: req.body.username,
      email: req.body.email,
      password: secPass,
    })
    const data={
      admin:{
        id:admin.id
      }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    res.json({"auth":authToken});

    }catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server error Occured");
    }
})

//ROUTE 2: authentication Login endpoint
router.post('/loginadmin',bodyParser.json(),[
   body('email','Enter a valid Email').isEmail(),
   body('password','Enter a valid Password').exists(),
  ], async (req,res)=>{
   //if there are errors,return bad request
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

   const {email,password}=req.body;
   try{
      let admin=await Login.findOne({email});
      if(!admin){
        return res.status(400).json({error:"Use proper Credentials"});
      }
      const passcomp=await bcrypt.compare(password,admin.password);
      if(!passcomp){
        return res.status(400).json({error:"Use proper Credentials"});
      }
      const data={
        admin:{
          id:admin.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET);
      res.json({"auth":authToken});
   }catch(error){
     console.error(error.message);
     res.status(500).send("Internal server error Occured");
   }
})

//ROUTE 3: authentication Login endpoint

router.post('/getadmin',fetchuser,bodyParser.json(),async (req,res)=>{
   
   try {
       userId=req.admin.id;
       const user=await Login.findById(userId).select("-password")
       res.send(user);
   } catch (error) {
     console.error(error.message);
     res.status(500).send("Internal server error Occured 1");
   }
 })
module.exports = router;
