const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
fullName: {
    type:String,
    required:true,
    trim:true,
},
email: {
    type:String,
    required:true, 
    unique:true,
    trim:true,
},
mobile: {
    type:String,
    required:true,
    unique:true, 
    trim:true,
    //valid Indian mobile number
}, 
higher_education:{
    type:String,
    required:true,
  },
hobby:{
    type:String,
    required:true
},
gender:{
    type:String,
    required:true,
    enum: ["male", "female"],
},
dob: {
    type: String,
    required: true
},
type_of_profile: {
    type: String,
    required: true
},
date_of_registration: {
    type: String,
    required: true
},
},{ timestamps:true }

)

module.exports=mongoose.model("USER TABLE", userSchema)