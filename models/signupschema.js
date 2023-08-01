const mongoose =require('mongoose')
const users=mongoose.Schema({
    name:{
        type:String,
        required:[true,"this field is required"],

    },
    email:{
        type:String,
        required:[true,"this field is required"],
        unique:[true,"this field should be unique"],
    },
    number:{
        type:String,
        required:[true,"this field is mandatory"],
        unique:[true,"this should be unique"]

    },
    designation:{
        type:String,
        required:[true,"this field is mandatory"]
        
    },
    city:{
        type:String,
        required:[true,"this field is mandatory"]
        
    },
    date:{
        type:Date,
        required:[true,"this field is mandatory"] 
    }

})

const signup =mongoose.model("signup",users);
module.exports =signup;