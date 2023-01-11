const ObjectId = require("mongoose").Types.ObjectId


//**********************************************************************//

//==Request Body Validation
let isValidRequestBody = function (body) {
    if (Object.keys(body).length === 0) return false;
    return true;
}
//**********************************************************************//

//==Mandatory Field Validation
let isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true;
}
//**********************************************************************//

//==ObjectId Validation
let isValidObjectId = function (objectId) {
    if (!ObjectId.isValid(objectId)) return false;
    return true;
}
//**********************************************************************//

//==Email Validation
let isValidEmail = function (email) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
}
//**********************************************************************//

//==Name Validation
let isValidName=function(name){
    let nameRegex=/^[A-Za-z\s]{1,}[A-Za-z\s]{0,}$/;
    return nameRegex.test(name);
    }
 //**********************************************************************//
    
//==File Validation
// const isValidFile = function(files){
//     let imageRegex = /.*\.(jpeg|jpg|png)$/;
//     return imageRegex.test(files)
// }

//*******************************************************************//

//==Mobile Number Validation
let isValidMobile = function (phone) {
    let mobileRegex =/^[6-9]\d{9}$/;
    return mobileRegex.test(phone); 
}
//**********************************************************************//
  
module.exports = {isValidRequestBody,isValid,isValidObjectId, isValidEmail,isValidName,isValidMobile }

