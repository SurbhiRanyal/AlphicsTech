const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')

const { isValidRequestBody, isValid} = require("../utilities/validator");

// //---USER LOGIN
const userLogin = async function(req,res){
      try {
  //==validating request body==//
       let requestBody = req.body
      if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, msg: "Invalid request, please provide details"})  
      const {email, password} = requestBody;
  
  //==validating email==//
      if (!isValid(email)) return res.status(400).send({ status: false, msg: "email is a mandatory field" })
      //if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: `${email} is not valid` })
         
  //==validating password==//
      if(!isValid(password))return res.status(400).send({status:false, message: `Password is required`})
             
  //==finding userDocument==//      
  const user = await userModel.findOne({ email });
  
  if (!user) {
      res.status(404).send({ status: false, message: `${email} related user unavailable` });
      return
  }
  const isLogin = await bcrypt.compare(password, user.password).catch(e => false)
  if (!isLogin) {
      res.status(401).send({ status: false, message: `wrong email address or password` });
      return
  }
          
  //==creating token==//   
  let token = jwt.sign(
      {
          userId:  user._id.toString(),
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000) + 96 * 60 * 60 //4days
      },
      "Alphics Tech Project"
  );
   
  //==sending and setting token==// 
         res.header('Authorization',token);
         res.status(200).send({status:true, message:`User login successfully`, data:{userId:user._id,token:token}});
  
     } catch (error) {
         res.status(500).send({status:false, message:error.message});
     }
  }

  module.exports = userLogin;
