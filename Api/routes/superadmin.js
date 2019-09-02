const express = require('express');
const router=express.Router();

const checkAuth=require('../middleware/check-auth');
const AdminController=require("../controllers/superadmin");
const superAdmin = require('../Models/user');
const bcrpt=require('bcrypt');

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

//To Create Hospital By SuperAdmin
router.post('/create',checkAuth,AdminController.createHospital);
//To Update SuperAdmin
router.post('/update',checkAuth,(req,res)=>{
    bcrpt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error: err
            });
        }
            else{
    superAdmin.findOneAndUpdate({
        _id:req.body.id
      },{$set:{email:req.body.email,password:hash}},{new:true}).then().catch();

}

    })
})

module.exports=router;