const express = require('express');
const router=express.Router();

const checkAuth=require('../middleware/check-auth');
const AdminController=require("../controllers/superadmin");

router.get('/superadmin',checkAuth,AdminController.GetData);


module.exports=router;