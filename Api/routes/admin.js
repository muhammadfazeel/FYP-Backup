const express = require('express');
const router=express.Router();

const bcrpt = require('bcrypt');

const auth= require('../middleware/check-auth');
const adminData = require('../Models/create-hospital');
const bedData = require('../Models/beds');
const userData = require('../Models/user');
const LabData = require('../Models/lab');
const Doc = require('../Models/doctor');
const Pat = require('../Models/patient');
const Rece = require('../Models/Recep');
const Lab = require('../Models/lab');
const App = require('../Models/appointments');
const ward = require('../Models/wards');


//Routes For To Get Admin Page
router.get('/Home',auth,async(req,res)=>{
let DocData = await Doc.find({hid:req.userData.hospitalid});
let DData = await Doc.find({hid:req.userData.hospitalid});
let PatData = await Pat.find({hid:req.userData.hospitalid});
let ReceData = await Rece.find({hid:req.userData.hospitalid});
let LabData = await Lab.find({hid:req.userData.hospitalid});
let AppData = await App.find({hid:req.userData.hospitalid});
let AppDone = await App.find({hid:req.userData.hospitalid,status:"done"});
let AppPending = await App.find({hid:req.userData.hospitalid,status:"pending"});
let WardData = await ward.find({hid:req.userData.hospitalid});

    res.render('admin',{
      DocData:DocData,
      PatData:PatData,
      ReceData:ReceData,
      LabData:LabData,
      AppData:AppData,
      AppDone:AppDone,
      AppPending:AppPending,
      WardData:WardData,
      DData:DData
    });
})
//To Get Dashboard Data
router.get('/Dashboard',auth,(req,res)=>{
    res.render('admin');
})
//To Add Bed
router.get('/addbed',auth,(req,res)=>{
    res.render('addbed');
})
//To Add 
router.get('/AddDepartment',auth,(req,res)=>{
    res.render('adddepart');
})
//To Display and Update Admin Profile
router.get('/Profile',auth,async(req,res)=>{
    let Admin
    try {
      Admin = await userData.findOne({_id:req.userData.userId})
      return res.render('AdminProfile',{
      posts:Admin
    })
      
    } catch {
      
        
    }
  
});

//To Delete Bed By Admin
router.delete('/Deletebed/:id',auth,async(req,res)=>{
    let Ward
    try {
      BED = await bedData.findById(req.params.id)
      await BED.remove()
      
      res.redirect('/bed/wardsList')
    } catch {
      
        res.redirect('/bed/wardsList')
    }
  
  
})

//To Update Admin Profile
router.post('/update',auth,(req,res)=>{
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
  adminData.findOneAndUpdate({
    _id:req.userData.hospitalid
  },{$set:{
    title:req.body.name,
    email:req.body.email,
    password:hash,
    phone:req.body.phone
  }},{new:true})
  .then()
  .catch();
  return  res.json({
    status:'success',
    
    redirect:'/admin/Profile',
  
  });
  
  }
  
    })
  })
//Admin Add Lab Page
router.get('/addlab',auth,(req,res)=>{
  res.render('addLab');
})
//To Create Lab
router.post('/lab',auth,(req,res,next)=>{
  userData.find({
    email: req.body.email
  })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email Already Exists"
        });
      } else {
        bcrpt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const recept = new LabData({
              hid: req.userData.hospitalid,
              name: req.body.name,
              email: req.body.email,
              password: hash,
              phone:req.body.phone
            });
            recept.save()
              .then(result => {
                const User = new userData({
                  hid: req.userData.hospitalid,
                  userId: result._id,
                  name: req.body.name,
                  email: req.body.email,
                  password: hash,
                  phone: req.body.phone,
                  role: "lab"
                });
                User.save()
                  .then()
                  .catch(err => {
                    console.log(err);
                  });
                return res.json({
                  status: "success",
                  redirect: "/admin/alllab"
                });
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      }
    });
  
  })

  // To Get All Lab Assistant
  router.get('/alllab',auth,async (req,res,next)=>{
    let result =await LabData.find({hid:req.userData.hospitalid})
    return  res.render('alllabadmin',{
        posts:result
    })
  })
module.exports=router;