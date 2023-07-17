const mongoose = require('mongoose');
const {Schema} = mongoose;
const LoginScheme = new Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true
    },
    date:{
        type:Date,
        default:Date.now
    }
  });

  module.exports =mongoose.model('Login',LoginScheme);