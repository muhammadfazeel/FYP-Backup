const express = require('express');
const router=express.Router();

const checkAuth=require('../middleware/check-auth');
const doctorcontroller=require('../controllers/doctor');

//**********Create Doctor***********//
router.post("/signup",checkAuth,doctorcontroller.signupDoctor);

module.exports=router;