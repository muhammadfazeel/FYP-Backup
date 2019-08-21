const express = require('express');
const router=express.Router();

const checkAuth=require('../middleware/check-auth');
const patientcontroller=require('../controllers/patient');

//**********Create Patient***********//
router.post("/enter-patient",checkAuth,patientcontroller.createPatient);
//To Get All Patients Of Hospital
router.get('/patientlist',checkAuth,patientcontroller.getPatient);
//To Del Patients Of Hospital
router.delete('/:id',checkAuth,patientcontroller.delPatient);


module.exports=router;