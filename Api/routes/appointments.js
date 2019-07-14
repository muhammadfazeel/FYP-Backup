const express = require('express');
const router=express.Router();

const checkauth=require('../middleware/check-auth');
const appointmentController=require("../controllers/appointments");

router.post('/getappontment',checkauth,appointmentController.getAppointment);

module.exports=router;