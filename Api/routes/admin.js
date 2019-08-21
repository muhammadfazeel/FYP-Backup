const express = require('express');
const router=express.Router();

const auth= require('../middleware/check-auth');


//Routes For To Get Admin Page
router.get('/Home',auth,(req,res)=>{
    res.render('admin');
})
//To Get Dashboard Data
router.get('/Dashboard',auth,(req,res)=>{
    res.render('admin');
})

//To Add 
router.get('/AddDepartment',auth,(req,res)=>{
    res.render('adddepart');
})
module.exports=router;