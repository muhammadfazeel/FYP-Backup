const express = require('express');
const router=express.Router();

const User = require("../Models/user");
const checkAuth=require('../middleware/check-auth');



const UserController=require('../controllers/user');

//Route To post Data Into DataBase//
router.post('/signup',UserController.user_signup);

//Route to Login into database//
router.post('/login',UserController.User_signin);

//Route To Delete Data from Database
router.delete('/:userId',checkAuth,UserController.User_delete);

module.exports=router;