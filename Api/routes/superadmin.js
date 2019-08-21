const express = require('express');
const router=express.Router();

const checkAuth=require('../middleware/check-auth');
const AdminController=require("../controllers/superadmin");

router.get('/superadmin',checkAuth,AdminController.GetData);

//To Display SuperAdmin Page
router.get('/superadmin',checkAuth,(req,res)=>{
    res.render('superadmin');
}) 
//To Activate and Deactivate All hospitals
router.get('/allhospitals',checkAuth,AdminController.Getinfo);
router.get('/allhospitals',checkAuth,(req,res)=>{
res.render('hospitals');
})
router.get('/:id/edit',(req,res)=>{
    res.send('id here' + req.params.id);
})
router.put('/activate/:id',checkAuth,AdminController.Activate)
router.put('/deactivate/:id',checkAuth,AdminController.Deactivate)
//To Create Hospital By Superadmin
router.get('/ScreateH',checkAuth,(req,res,next)=>{
    res.render('createhospital')
});
//To Update SuperAdmin Info
router.get('/Superinfo',checkAuth,AdminController.updateProfile);
router.get('/Superinfo',checkAuth,(req,res,next)=>{
    res.render('superprofile')
});
//To Delete Hospital
router.delete('/:id',checkAuth,AdminController.deleteHospital);
module.exports=router;
//To Create Hospital By SuperAdmin
router.post('/create',checkAuth,AdminController.createHospital);