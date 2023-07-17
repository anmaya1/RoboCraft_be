const express= require('express');
const router=express.Router();
const Login=require('../models/Login');
const { body, validationResult } = require('express-validator');
const bodyParser=require('body-parser');

router.post('/',bodyParser.json(),[
    body('email','Enter a valid Email').isEmail(),
     body('password','Enter a valid Password').isLength({min: 8}),
],(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

      Login.create({
      email: req.body.email,
      password: req.body.password,
    }).then(login => res.json(login))
    .catch(err=>{console.log(err)
    res.json({error:'Please enter a unique email id',message: err.message})})

})

module.exports = router;
