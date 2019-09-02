const express = require('express');
const router=express.Router();

const bcrpt = require('bcrypt');

const auth= require('../middleware/check-auth');
const adminData = require('../Models/create-hospital');
const bedData = require('../Models/beds');
const userData = require('../Models/user');

//Routes For To Get Admin Page
router.get('/Home',auth,(req,res)=>{
    res.render('admin');
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

module.exports=router;