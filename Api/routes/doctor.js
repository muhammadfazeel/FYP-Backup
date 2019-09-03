let ApPt;
let ptData;
let Dr;
let AppointmentPatient;
let patient_Data;
let Dr_Data;

const express = require("express");
const router = express.Router();

const bcrpt = require('bcrypt')

const checkAuth = require("../middleware/check-auth");
const doctorcontroller = require("../controllers/doctor");
const DoctorSchema = require("../Models/doctor");
const Patient = require("../Models/patient");
const AppointmentData = require("../Models/appointments");
const bedData = require("../Models/beds");
const wardData = require("../Models/wards");
const AllotedBed = require("../Models/alloted-beds");
const HospitalSchema = require("../Models/create-hospital");
const PatientHistory = require('../Models/patientHistory');
const userData = require('../Models/user');
const LabData = require('../Models/lab');
const LabTestData = require('../Models/labtest');
//To Get Doctor Main Page
router.get("/Home", checkAuth, (req, res) => {
  res.render("doctor");
});
//To Get Appointments page
router.get("/Appointment", checkAuth, async (req, res) => {
  let App = await AppointmentData.find({ doctorid: req.userData.uid,status:'pending' });
  return res.render("appointmentsdoctor", {
    posts: App
  });
  // res.render("appointmentsdoctor");
});
//To get All Appointments of today
router.get("/App/Today", checkAuth, doctorcontroller.getallAppointmentToday);
//Prescription
router.get("/prescription", checkAuth, async (req, res) => {
  var BB = req.body;
  //console.log(BB);

  ApPt = await AppointmentData.findOne({ patientid: req.body.patientid });

  ptData = await Patient.findOne({ _id: req.body.patientid });

  Dr = await DoctorSchema.findOne({ _id: req.body.doctorid });

  return res.json({
    redirect: "/doctor/presspage"
  });
});
//Prescription page
router.get("/Presspage", checkAuth, async (req, res) => {
  let HospitalData = await HospitalSchema.findOne({
    _id: req.userData.hospitalid
  });
  res.render("prescription", {
    Hospital: HospitalData,
    post: ApPt,
    posts: ptData,
    pst: Dr
  });
});
//LabTest
router.get("/LabTest", checkAuth, async (req, res) => {
  var BB = req.body;

  AppointmentPatient = await AppointmentData.findOne({ patientid: req.body.patientid });

  patient_Data = await Patient.findOne({ _id: req.body.patientid });

  Dr_Data = await DoctorSchema.findOne({ _id: req.body.doctorid });

  return res.json({
    redirect: "/doctor/labpage"
  });
});
//Lab test Page
router.get("/labpage", checkAuth, async (req, res) => {
  let HospitalData = await HospitalSchema.findOne({
    _id: req.userData.hospitalid
  });
  let LabAssistant = await LabData.find({hid:req.userData.hospitalid});
  res.render("presc", {
    Hospital: HospitalData,
    post: AppointmentPatient,
    posts: patient_Data,
    pst: Dr_Data,
    lab:LabAssistant
  });
});

//Doctor Profile
router.get("/Profile", checkAuth, async (req, res) => {
  let DoctorData;
  try{ 
 DoctorData = await userData.findOne({ _id: req.userData.userId });
  console.log(DoctorData);
  return res.render("Doctor-Profile", {
    posts: DoctorData
  });
}catch{

}
});

//**********Create Doctor***********//
router.post("/signup", checkAuth, doctorcontroller.signupDoctor);
router.get("/signup", checkAuth, (req, res) => {
  res.render("adddoctor");
});
//To Get Doctors Of Specific Hospital
router.get("/doctorList", checkAuth, async (req, res) => {
  let DoctorData = await DoctorSchema.find({ hid: req.userData.hospitalid });
  return res.render("doctorlist", {
    posts: DoctorData
  });
  
});


//To Add Doctor Schedule
//Get Page
router.get("/schedule", checkAuth, (req, res) => {
  res.render("DoctorSchedule");
});


//Doctor Schedule
router.get("/addSchedule", checkAuth, (req, res) => {
  res.render("DoctorSchedule");
});


//To Delete Doctor
router.delete("/:id", checkAuth, doctorcontroller.deleteDoctor);
router.get("/patientlist", checkAuth, async (req, res) => {
  let result = await Patient.find({ hid: req.userData.hospitalid });
  return res.render("patientlistdoctor", {
    posts: result
  });
});


//bed list
router.get("/wardsList", checkAuth, async (req, res) => {
  let WData = await bedData.find({ hid: req.userData.hospitalid });
  return res.render("DoctorBedList", {
    posts: WData
  });
});


//Delete Ward
router.delete("/doctorBed/:id", checkAuth, async (req, res) => {
  let Ward;
  try {
    BED = await bedData.findById(req.params.id);
    await BED.remove();

    res.redirect("/doctor/wardsList");
  } catch {
    res.redirect("/doctor/wardsList");
  }
});


//To GEt AllotBed Page
router.get("/AllotBed", checkAuth, async (req, res) => {
  let Data = await wardData.find({ hid: req.userData.hospitalid });
  let PatientxD = await Patient.find({ hid: req.userData.hospitalid });
  let _Bed = await bedData.find({ hid: req.userData.hospitalid });
  return res.render("allotbed", {
    posts: Data,
    post: PatientxD,
    pst: _Bed
  });
});



//To Allot Bed To Patient
router.post("/AllotBed", checkAuth, (req, res) => {

 AllotedBed.find({
  Pid:req.body.Pid
})
    .exec()
    .then(user => {
      if (user.length >= 1) {
  var messages=req.flash('error','Patient Already Has Alloted Bed')
        return res.status(409).json({
          message: "Patient Already Has Aloted Bed"
        });
      } else {
        AllotedBed.find({
          bedid:req.body.bedid
        })
            .exec()
            .then(user => {
              if (user.length >= 1) {
                return res.status(409).json({
                  message: "Bed Not Availabe Already Alloted"
                });
              } else {
         

        const  allotbedtopatient = new AllotedBed({
          hid: req.userData.hospitalid,
          ward: req.body.ward,
          Pid:req.body.Pid,
          bedid: req.body.bedid,
          Pname:req.body.Pname,
          description: req.body.description,
          bednum:req.body.bednum,
          status:"Alloted"
        });
        allotbedtopatient.save().then(ans=>{
          bedData.findOneAndUpdate({
            _id:req.body.bedid
          },{$set:{status:"Alloted"}},{new:true}).then().catch();
        }).catch(err => {
          console.log(err);
        });
        return res.json({
          status: "success",

          redirect: "/doctor/Allotments"
        });
      }
    });
    }
});
})


//To Add Med History Of Patient
router.post('/MedHistory',(req, res, next) => {
   {
      const History = new PatientHistory({
          hid: req.body.hid,
          Pname: req.body.patientname,
          Dname:req.body.doctorname,
          Pid: req.body.patientid,
          Pemail:req.body.patientemail,
          Did:req.body.doctorid,
          symptoms:req.body.symptoms,
          diagnosis:req.body.diagnosis,
          medicines:req.body.medicine,
          note:req.body.note
        });
        History
          .save()
          .then()
          .catch(err => {
            console.log(err);
          });
        return res.json({
          status: "success",

          redirect: "/doctor/Appointment"
        });
      }
    });
//
router.post('/AddLabTest',(req, res, next) => {
  {
     const History = new LabTestData({
         hid: req.body.hid,
         patientname: req.body.patientname,
         doctorname:req.body.doctorname,
         patientid: req.body.patientid,
         doctorid:req.body.doctorid,
         labid:req.body.labid,
         test:req.body.test,
         details:req.body.details
       });
       History
         .save()
         .then()
         .catch(err => {
           console.log(err);
         });
       return res.json({
         status: "success",

         redirect: "/doctor/Appointment"
       });
     }
   });

//To Delete APpoitment
router.delete('/Appointment/:id',checkAuth,doctorcontroller.deleteReceptApp);


//To Change Status of bed
router.put('/Appointment/status/:id',(req,res)=>{
var id = req.params.id;
AppointmentData.findOne({_id:id},function(err,foundObject){
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
  res.redirect('/doctor/Appointment')
})
})

//To check Allotments
router.get('/Allotments',checkAuth,async(req,res)=>{
let info
try{
  info= await AllotedBed.find({hid:req.userData.hospitalid,status:"Alloted"});
  res.render('allotments',{
    posts:info
  })
}
catch{}
})

//To Discharge Patient
router.delete('/Discharge/:id',checkAuth,async (req,res,next)=>{
  let Status
  try{ 
      Status = await AllotedBed.findById(req.params.id)
    
      await Status.remove().then(ans=>{
        bedData.findOneAndUpdate({
          _id:Status.bedid
        },{$set:{status:"Available"}},{new:true}).then().catch();
      }).catch(err => {
        console.log(err);
      });
      res.redirect('/doctor/Allotments');
  }catch{
console.log('Error Here');
  }
});

//To Update Doctor
router.post('/update',checkAuth,(req,res)=>{
  bcrpt.hash(req.body.password,10,(err,hash)=>{
      if(err){
          return res.status(500).json({
              error: err
          });
      }
          else{
  userData.findOneAndUpdate({
      _id:req.body.id
    },{$set:{
      name:req.body.name,
      email:req.body.email,
      password:hash,
      phone:req.body.phone
    }},{new:true})
    .then()
    .catch();
DoctorSchema.findOneAndUpdate({
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
  
  redirect:'/doctor/Profile',

});

}

  })
})


module.exports = router;