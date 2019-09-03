const express = require('express');
const router=express.Router();

const TestData = require('../Models/labtest');
const LabData = require('../Models/lab');
const Userdata = require('../Models/user');
const AppointmentData = require('../Models/appointments');
const Patient = require('../Models/patient');
const DoctorSchema = require('../Models/doctor');
const HospitalSchema = require('../Models/create-hospital');
const labtestreport = require('../Models/labreport');
const bcrpt= require('bcrypt');


const checkauth=require('../middleware/check-auth');

router.get('/Home',checkauth,(req,res)=>{
  res.render('lab')
})

//To Delete Lab By Admin
router.delete('/:id',checkauth,async (req,res,next)=>{
    let Rece
    let User
  try {
    Rece = await LabData.findById(req.params.id)
    await Rece.remove().then(async result=>{
      User= await Userdata.findOne({userId:req.params.id});
      await User.remove()
  })
    
    res.redirect('/admin/alllab');
  } catch {
    
      res.redirect('/admin/alllab');
  }
})
//To Get List Of Tests
router.get('/testlist',checkauth,async (req,res)=>{
let Data
try{
Data =await TestData.find({hid:req.userData.hospitalid,status:"pending"});
res.render('LabTestList',{
  posts:Data
})

}catch{

}
})
//////****************************************Panga***********************/
//LabTest
router.get("/LabTest", checkauth, async (req, res) => {
  var BB = req.body;

  AppointmentPatient = await AppointmentData.findOne({ patientid: req.body.patientid });

  patient_Data = await Patient.findOne({ _id: req.body.patientid });

  Dr_Data = await DoctorSchema.findOne({ _id: req.body.doctorid });

  return res.json({
    redirect: "/lab/labpage"
  });
});
//Lab test Page
router.get("/labpage", checkauth, async (req, res) => {
  let HospitalData = await HospitalSchema.findOne({
    _id: req.userData.hospitalid
  });
  let LabAssistant = await LabData.find({hid:req.userData.hospitalid});
  res.render("prescLab", {
    Hospital: HospitalData,
    post: AppointmentPatient,
    posts: patient_Data,
    pst: Dr_Data,
    lab:LabAssistant
  });
});

//Lab Assistant adding report
router.post('/AddLabTest',(req, res, next) => {
  {
     const History = new labtestreport({
         hid: req.body.hid,
         patientid: req.body.patientid,
         doctorid:req.body.doctorid,
         labid:req.body.labid,
         test:req.body.test,
         details:req.body.details,
         result:req.body.result,
         status:"Done",
         Drstatus:"pending"
       });
       History
         .save()
         .then()
         .catch(err => {
           console.log(err);
         });
       return res.json({
         status: "success",

         redirect: "/lab/testlist"
       });
     }
   });
//To Change Status of Test Report
router.put('/test/status/:id',(req,res)=>{
  var id = req.params.id;
  TestData.findOne({_id:id},function(err,foundObject){
    if(err){
      res.status(500).send();
    }else {
      if(!foundObject){
        res.status(404).send();
      }
      else{
        foundObject.status="done"
      }
      foundObject.save();
    }
    res.redirect('/lab/testlist')
  })
  })
  

//Lab Profile
router.get('/profile',checkauth,async (req,res)=>{
  let lab 
  lab =await Userdata.findOne({_id: req.userData.userId})
  return res.render("lab-profile", {
    posts: lab
  });
})


//Update Profile
router.post('/update',checkauth,(req,res)=>{
  bcrpt.hash(req.body.password,10,(err,hash)=>{
      if(err){
          return res.status(500).json({
              error: err
          });
      }
          else{
  Userdata.findOneAndUpdate({
      _id:req.body.id
    },{$set:{
      name:req.body.name,
      email:req.body.email,
      password:hash,
      phone:req.body.phone
    }},{new:true})
    .then()
    .catch();
LabData.findOneAndUpdate({
  _id:req.body.userId
},{$set:{
  name:req.body.name,
  email:req.body.email,
  password:hash,
  phone:req.body.phone
}},{new:true})
.then()
.catch();
var messages = req.flash('success','Updated Successfully')
return  res.json({
  status:'success',
  redirect:'/lab/profile',

});

}

  })
})

module.exports=router;