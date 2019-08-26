const express = require('express');
const router=express.Router();

const checkauth=require('../middleware/check-auth');
const appointmentController=require("../controllers/appointments");
const Patient = require('../Models/patient');
const Doctors = require('../Models/doctor');

//To Render AddAppointment By Admin
router.get('/AddAppointment',checkauth,async (req,res)=>{
    let result =await Patient.find({hid:req.userData.hospitalid})
    let Yes =await Doctors.find({hid:req.userData.hospitalid})
    return  res.render('addappointmentsadmin',{
        posts:result,
        Posts:Yes
    })
    // res.render("addappointmentsadmin");
})

//To Get All Appointments
router.get('/getappontment',checkauth,appointmentController.getallAppointment);
//To Delete Appointment
router.delete('/deleteAppointment',checkauth,appointmentController.deleteAppointment);
//To Add New Appointment
router.post('/addApp',checkauth,appointmentController.addAppointment);


module.exports=router;