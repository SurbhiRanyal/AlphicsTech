const express = require("express")
const router = express.Router();
const {createlogin, updateProfile,getData} = require('../controller/userController')


router.post('/usertable', createlogin)
router.put('/update/:_id/',updateProfile)
router.get('/user/:_id/profile', getData)


module.exports=router