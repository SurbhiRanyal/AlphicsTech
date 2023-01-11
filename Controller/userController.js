const { default: mongoose } = require("mongoose");
const userModel = require("../Models/userModel");

const {
  isValidRequestBody,
  isValid,
  isValidName,
  isValidEmail,
  isValidMobile,
  isValidObjectId,
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
    let {
      fullName,
      email,
      mobile,
      higher_education,
      hobby,
      gender,
      dob,
      type_of_profile,
      date_of_registration,
    } = requestBody;

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

    //==validating higher_education==//
    if (!isValid(higher_education))
      return res.status(400).send({
        status: false,
        message: "Please provide higher_education",
      });

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

    //==validating hobby==//
    if (!isValid(hobby))
      return res.status(400).send({
        status: false,
        message: "Please provide hobby",
      });

    //==validating date of Birth==//
    if (dob) {
      const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
      if (!dateRegex.test(dob)) {
        return res.status(400).send({
          status: false,
          message: `Release date must be in "YYYY-MM-DD" format only And a "Valid Date"`,
        });
      }
    } else {
      return res
        .status(400)
        .send({ status: false, message: "please provide dob" });
    }

    //==validating type_of_profile==//
    if (!isValid(type_of_profile))
      return res.status(400).send({
        status: false,
        message: "Please provide type_of_profile",
      });

    //==validating date_of_registration==//
    if (date_of_registration) {
      const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
      if (!dateRegex.test(date_of_registration)) {
        return res.status(400).send({
          status: false,
          message: `Release date must be in "YYYY-MM-DD" format only And a "Valid Date"`,
        });
      }
    } else {
      return res
        .status(400)
        .send({
          status: false,
          message: "please provide date_of_registration",
        });
    }

    //==creating user==//
    const userData = {
      fullName,
      email,
      mobile,
      higher_education,
      hobby,
      gender,
      dob,
      type_of_profile,
      date_of_registration,
    };
    const saveUser = await userModel.create(userData);
    return res
      .status(201)
      .send({ status: true, message: "User profile details", data: saveUser });
  } catch (err) {
    return res.status(500).send({ status: false, error: err.message });
  }
};

//*******************************************************************//

const updateProfile = async function (req, res) {
  try {
    let userId = req.params._id;
    const data = req.body;
    let {
      email,
      higher_education,
      hobby,
      gender,
      dob,
      type_of_profile,
      date_of_registration,
    } = data;

    if (!isValidObjectId(userId))
      return res
        .status(400)
        .send({ status: false, message: "Please Provide valid userId" });

    let userProfile = await userModel.findById(userId);
    if (!userProfile) {
      return res.status(404).send("user not found!");
    }

    if (email)
      if (!email)
        return res
          .status(400)
          .send({ status: false, message: "Please provide email" });
    if (higher_education)
      if (!higher_education)
        return res
          .status(400)
          .send({ status: false, message: "Please provide higher_education" });
    if (hobby)
      if (!hobby)
        return res
          .status(400)
          .send({ status: false, message: "Please provide hobby" });
    if (gender)
      if (!gender)
        return res
          .status(400)
          .send({ status: false, message: "Please provide gender" });
    if (dob)
      if (!dob)
        return res
          .status(400)
          .send({ status: false, message: "Please provide dob" });
    if (type_of_profile)
      if (!type_of_profile)
        return res
          .status(400)
          .send({ status: false, message: "Please provide type_of_profile" });
    if (date_of_registration)
      if (!date_of_registration)
        return res
          .status(400)
          .send({
            status: false,
            message: "Please provide date_of_registration",
          });

    const updateUser = await userModel.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          email: data.email,
          higher_education: data.higher_education,
          gender: data.gender,
          dob: data.dob,
          type_of_profile: data.type_of_profile,
          date_of_registration: data.date_of_registration,
        },
      },
      { new: true }
    );

    return res
      .status(201)
      .send({
        status: true,
        message: "User profile updated",
        data: updateUser,
      });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ status: "error", error: err.message });
  }
};

//*******************************************************************//

//---GET USER DETAILS
const getData = async function (req, res) {
  try {
    //==validating userId==//
    let userId = req.params._id;
    if (!isValidObjectId(userId))
      return res.status(400).send({ status: false, msg: "userId is invalid" });

    //==getting details==//
    let getDataList = await userModel.findOne({ _id: userId });
    if (!getDataList)
      return res.status(404).send({ status: false, msg: "data not found " });

    //==sending details==//
    return res
      .status(200)
      .send({ status: true, msg: "user profile details", data: getDataList });
  } catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports = { createlogin, updateProfile, getData };
