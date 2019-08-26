const express = require('express');
const router=express.Router();


const checkAuth = require('../middleware/check-auth');
const RecepController = require('../controllers/Recep');
const PatientData = require('../Models/patient');
DoctorData = require('../Models/doctor');

//To Get Receptionist Page
router.get('/Home',checkAuth,(req,res)=>{
    res.render('RecepHome');
});

router.get('/Add',checkAuth,async(req,res)=>{
    let Patient = await PatientData.find({ hid: req.userData.hospitalid });
    let Doctor = await DoctorData.find({hid: req.userData.hospitalid});
    return res.render("AddAppointment", {
        post:Doctor,
        posts:Patient
});
    //res.render('AddAppointment')
});

router.post('/Receptionist',checkAuth,RecepController.CreateRecep);
//Admin Add Receptionist
router.get('/Receptionist',checkAuth,(Req,res)=>{
    res.render('addRecep')
})
//To Get All Receptionist
router.get('/allRecep',checkAuth,RecepController.GetRecep);
//To Delete Receptionist
router.delete('/:id',checkAuth,RecepController.deleteRecept);

module.exports=router;