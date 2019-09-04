const express = require('express');
const router=express.Router();

const checkAuth=require('../middleware/check-auth');
const patientcontroller=require('../controllers/patient');
const PatHistory = require('../Models/patientHistory');
const Hospital = require('../Models/create-hospital');
const User = require('../Models/user');
const bcrpt = require('bcrypt');
const patModel = require('../Models/patient');
const AppointmentData = require('../Models/appointments');


//To Get Home page
router.get('/Home',checkAuth,async (req,res)=>{
let Data 
Data = await AppointmentData.find({patientid:req.userData.uid})
    res.render('patientHome',{
      posts:Data
    })
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
//To Update Profile
router.post('/update',checkAuth,(req,res)=>{
  bcrpt.hash(req.body.password,10,(err,hash)=>{
      if(err){
          return res.status(500).json({
              error: err
          });
      }
          else{
  User.findOneAndUpdate({
      _id:req.body.id
    },{$set:{
      name:req.body.name,
      email:req.body.email,
      password:hash,
      phone:req.body.phone
    }},{new:true})
    .then()
    .catch();
patModel.findOneAndUpdate({
  _id:req.body.userId
},{$set:{
  name:req.body.name,
  email:req.body.email,
  password:hash,
  phone:req.body.phone
}},{new:true})
.then()
.catch();
return  res.json({
  status:'success',
  
  redirect:'/patient/profile',

});

}

  })
})


module.exports=router;