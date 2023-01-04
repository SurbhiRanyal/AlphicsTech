const express = require("express")
const router = express.Router();
const createlogin = require('../controller/loginController')
const userLogin = require('../controller/userController')


router.post('/login', createlogin)
router.post('/loginuser', userLogin)


module.exports=router