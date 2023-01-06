const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");

const {
  isValidRequestBody,
  isValid,
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidMobile,
} = require("../utilities/validator");

//---REGISTER USER
const createlogin = async function (req, res) {
  try {
    //==validating request body==//
    let requestBody = req.body;
    if (!isValidRequestBody(requestBody))
      return res.status(400).send({
        status: false,
        msg: "Invalid request, please provide details",
      });
    let { fullName, email, password, mobile, hobby,gender, DOB } = requestBody;

    //==validating first name==//
    if (!isValid(fullName))
      return res
        .status(400)
        .send({ status: false, msg: "fullName is a mandatory field" });
    if (!isValidName(fullName))
      return res
        .status(400)
        .send({ status: false, msg: "fullName must contain only alphabates" });

    //==validating email==//
    if (!isValid(email))
      return res
        .status(400)
        .send({ status: false, msg: "email is a mandatory field" });
    if (!isValidEmail(email))
      return res
        .status(400)
        .send({ status: false, msg: `${email} is not valid` });
    let isUniqueEmail = await userModel.findOne({ email: email });
    if (isUniqueEmail)
      return res
        .status(400)
        .send({ status: false, msg: `${email} is already exist` });

    //==validating password==//
    if (!isValid(password))
      return res
        .status(400)
        .send({ status: false, msg: "Password is a mandatory field" });
    if (!isValidPassword(password))
      return res.status(400).send({
        status: false,
        msg: `Password ${password}  must include atleast one special character[@$!%?&], one uppercase, one lowercase, one number and should be mimimum 8 to 15 characters long`,
      });

    //==validating phone==//
    if (!isValid(mobile))
      return res
        .status(400)
        .send({ status: false, msg: "Mobile is a mandatory field" });
    if (!isValidMobile(mobile))
      return res
        .status(400)
        .send({ status: false, msg: `${mobile} Mobile is not a valid` });
    let isUniquePhone = await userModel.findOne({ mobile: mobile });
    if (isUniquePhone)
      return res
        .status(400)
        .send({ status: false, msg: `${phone} Mobile is already exist` });

    //==validating hobby==//
    if (!isValid(hobby))
      return res
        .status(400)
        .send({
          status: false,
          message: "Please provide hobby",
        });

    //==validating date of Birth==//
    if (DOB) {
      const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
      if (!dateRegex.test(DOB)) {
        return res.status(400).send({
          status: false,
          message: `Release date must be in "YYYY-MM-DD" format only And a "Valid Date"`,
        });
      }
    } else {
      return res
        .status(400)
        .send({ status: false, message: "please provide DOB" });
    }

    // gender validation
    if (!gender)
      return res
        .status(400)
        .send({ status: false, msg: "gender must be present" });
    if (typeof gender !== "string")
      return res
        .status(400)
        .send({ status: false, msg: "gender should be string" });
    if (!["male", "female"].includes(gender.trim()))
      return res
        .status(400)
        .send({ status: false, msg: "plz write valid gender" });
    gender = gender.trim();

    //==password hashing==//
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    //==creating user==//
    const userData = { fullName, email, password, mobile,hobby,gender, DOB };
    const saveUser = await userModel.create(userData);
    return res
      .status(201)
      .send({ status: true, message: "User profile details", data: saveUser });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

//*******************************************************************//

module.exports = createlogin;
