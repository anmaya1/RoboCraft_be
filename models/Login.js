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
    },
    date:{
        type:Date,
        default:Date.now
    }
  });
  const LoginUser=mongoose.model('Login',LoginScheme);
  LoginUser.createIndexes();
  module.exports = LoginUser;