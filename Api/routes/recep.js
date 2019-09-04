const express = require('express');
const router=express.Router();


const checkAuth = require('../middleware/check-auth');
const RecepController = require('../controllers/Recep');
const PatientData = require('../Models/patient');
const DoctorData = require('../Models/doctor');
const AppointmentData = require('../Models/appointments');
const user = require('../Models/user');
const Hospital = require('../Models/create-hospital');
const payment = require('../Models/payment');
const bcrpt = require('bcrypt');
const RecepModel = require('../Models/Recep');
//To Get Receptionist Page
router.get('/Home',checkAuth,async (req,res)=>{
  let Data
  Data = await AppointmentData.find({hid:req.userData.hospitalid})
    res.render('RecepHome',{
      posts:Data
    });
});
//To Display Appointments Of Specific Hospital And Render page
router.get('/AllAppointments',checkAuth,async(req,res)=>{
    let App = await AppointmentData.find({ hid: req.userData.hospitalid });
    return res.render("appointmentlist", {
        posts:App,
});
    
});


//To Get Doctors And Patients Of A specific Hospital
router.get('/Add',checkAuth,async(req,res)=>{
    let Patient = await PatientData.find({ hid: req.userData.hospitalid });
    let Doctor = await DoctorData.find({hid: req.userData.hospitalid});
    return res.render("AddAppointment", {
        post:Doctor,
        posts:Patient
});
    
});
//To Delete Appointment
router.delete('/Appointment/:id',checkAuth,RecepController.deleteReceptApp);

router.post('/Receptionist',checkAuth,RecepController.CreateRecep);
//Admin Add Receptionist
router.get('/Receptionist',checkAuth,(Req,res)=>{
    res.render('addRecep')
})
//To Get All Receptionist
router.get('/allRecep',checkAuth,RecepController.GetRecep);
//To Delete Receptionist
router.delete('/:id',checkAuth,RecepController.deleteRecept);
//To Delete Appointment
router.delete('/Appointment/:id',checkAuth,RecepController.deleteReceptApp);
//Recep Profile
router.get('/Profile',checkAuth,async (req,res)=>{
let Data 
try{
Data = await user.findOne({_id:req.userData.userId})
res.render('Recep-Profile',{
    posts:Data
})
}catch{}
});
//Payment add payment
router.get('/payment',checkAuth,async (req,res)=>{
    let Data
    let PatData
    let hsp
    try{
        hsp = await Hospital.findOne({_id:req.userData.hospitalid});
        Data = await DoctorData.find({hid:req.userData.hospitalid});
        PatData = await PatientData.find({hid:req.userData.hospitalid});
        res.render('payment',{
            posts:Data,
            post:PatData,
            hospital:hsp
})
    }catch{

    }
})

//To Add Payment
router.post('/addpayment',checkAuth,(req,res)=>{
    {
        const History = new payment({
            hid: req.userData.hospitalid,
            Pname: req.body.Pname,
            Dname:req.body.Dname,
            Pid: req.body.Pid,
            
            Did:req.body.Did,
            
            total:req.body.total
          });
          History
            .save()
            .then()
            .catch(err => {
              console.log(err);
            });
          return res.json({
            status: "success",
  
            redirect: "/recep/Home"
          });
        }
     
})
//To Update Profile
router.post('/update',checkAuth,(req,res)=>{
    bcrpt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error: err
            });
        }
            else{
    user.findOneAndUpdate({
        _id:req.body.id
      },{$set:{
        name:req.body.name,
        email:req.body.email,
        password:hash,
        phone:req.body.phone
      }},{new:true})
      .then()
      .catch();
  RecepModel.findOneAndUpdate({
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
    
    redirect:'/recep/Profile',
  
  });
  
  }
  
    })
  })
module.exports=router;