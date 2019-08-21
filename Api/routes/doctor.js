const express = require('express');
const router=express.Router();

const checkAuth=require('../middleware/check-auth');
const doctorcontroller=require('../controllers/doctor');
const DoctorSchema = require('../Models/doctor');

//**********Create Doctor***********//
router.post("/signup",checkAuth,doctorcontroller.signupDoctor);
router.get('/signup',checkAuth,(req,res)=>{
res.render('adddoctor')
})
//To Get Doctors Of Specific Hospital
router.get('/doctorList',checkAuth,async (req,res)=>{
    let DoctorData =await DoctorSchema.find({hid:req.userData.hospitalid})
    return  res.render('doctorlist',{
        posts:DoctorData
    })
    // res.render("addappointmentsadmin");
})
//To Get Doctor Of Specific Specialization
// router.get('/special',checkAuth, (req,res)=>{
//     //let DocotrData =await DoctorSchema.find({hid:req.userData.hospitalid})
//    res.send(req.body.status)
// })

//To Delete Doctor
router.delete('/:id',checkAuth,doctorcontroller.deleteDoctor)

module.exports=router;