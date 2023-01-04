const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
fname: {
    type:String,
    required:true,
    trim:true,
},
lname: {
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
password: {
    type:String,
    required:true, 
    minLen: 8, 
    maxLen: 15,
    trim:true,
}, // encrypted password
},{ timestamps:true }

)

module.exports=mongoose.model("newUser", userSchema)