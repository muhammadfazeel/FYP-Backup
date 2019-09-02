const express = require('express');
const router=express.Router();

const checkAuth=require('../middleware/check-auth');
const patientcontroller=require('../controllers/patient');
const PatHistory = require('../Models/patientHistory');
const Hospital = require('../Models/create-hospital');
const User = require('../Models/user');


//To Get Home page
router.get('/Home',checkAuth,(req,res)=>{
    res.render('patientHome')
})
//To get Patient History
router.get('/History',checkAuth,async (req,res)=>{
  let Data
  let HospitalName
  

  try{ 
    HospitalName = await Hospital.findOne({_id:req.userData.hospitalid})
    Data =await PatHistory.find({Pid:req.userData.uid})
    console.log(HospitalName.title)
    res.render('PatientHistory',{
        posts:Data,
        post:HospitalName
    })
  }   catch{

  } 
})
//To Get Add Patient Page
router.get('/addPatient',checkAuth,(req,res)=>{
    res.render('addPatientRecep');
})

//Patient Profile
router.get('/profile',checkAuth,async (req,res)=>{
let Data
try{
Data=await User.findOne({_id:req.userData.userId});

res.render('patient-profile',{
    posts:Data
})
}catch{

}
})

//**********Create Patient***********//
router.post("/enter-patient",checkAuth,patientcontroller.createPatient);
//To Get All Patients Of Hospital
router.get('/patientlist',checkAuth,patientcontroller.getPatient);
router.get('/patientlistRecep',checkAuth,patientcontroller.getPatientinfo);
//To Del Patients Of Hospital
router.delete('/:id',checkAuth,patientcontroller.delPatient);
router.delete('/Recep/:id',checkAuth,patientcontroller.delPatientRecep);


module.exports=router;