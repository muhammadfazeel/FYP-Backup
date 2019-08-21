const express = require('express');
const router=express.Router();


const auth = require('../middleware/check-auth')
const HospitalController=require('../controllers/create-hospital');

//Routes to create Hospital
router.post('/create',HospitalController.createHospital);

//Routes For To Get Admin Page
router.get('/admin',(req,res)=>{
    res.render('admin');
})

//Route to Activate/Deactivate Hospital//
//router.post('/update',HospitalController.handleHospital);

//Route To Delete Hospital
//router.delete('/:userId',HospitalController.deleteHospital);

module.exports=router;