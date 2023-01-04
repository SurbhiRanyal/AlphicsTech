const userModel = require("../Models/userModel");
const bcrypt = require('bcrypt')


const { isValidRequestBody, isValid,isValidName,  isValidEmail, isValidPassword} = require("../utilities/validator");


//---REGISTER USER
const createlogin = async function (req, res) {
  try{
//==validating request body==//
     let requestBody = req.body
     if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, msg: "Invalid request, please provide details" })
     let { fname,lname,email,password } = requestBody

//==validating first name==//
    if (!isValid(fname)) return res.status(400).send({ status: false, msg: "Name is a mandatory field" })
    if (!isValidName(fname)) return res.status(400).send({ status: false, msg: "Name must contain only alphabates" })

//==validating last name==//
    if (!isValid(lname)) return res.status(400).send({ status: false, msg: "Last Name is a mandatory field" })
    if (!isValidName(lname)) return res.status(400).send({ status: false, msg: "Last Name must contain only alphabates" })

//==validating email==//
if (!isValid(email)) return res.status(400).send({ status: false, msg: "email is a mandatory field" })
if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: `${email} is not valid` })
let isUniqueEmail = await userModel.findOne({ email: email })
if (isUniqueEmail) return res.status(400).send({ status: false, msg: `${email} is already exist` })

//==validating password==//
if (!isValid(password)) return res.status(400).send({ status: false, msg: "Password is a mandatory field" })
if (!isValidPassword(password)) return res.status(400).send({ status: false, msg: `Password ${password}  must include atleast one special character[@$!%?&], one uppercase, one lowercase, one number and should be mimimum 8 to 15 characters long` })

//==password hashing==//
const salt = await bcrypt.genSalt(10);
password = await bcrypt.hash(password, salt)

//==creating user==//    
const userData = { fname,lname,email,password };
const saveUser = await userModel.create( userData)
return res.status(201).send({ status: true, message: "User profile details", data: saveUser })
}catch (err) {
    return res.status(500).send({ status: false, error: err.message })
}

}

//*******************************************************************//



  
module.exports = createlogin;



    