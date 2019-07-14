const express = require('express');
const router=express.Router();


const HospitalController=require('../controllers/create-hospital');


//Routes to create Hospital
router.post('/create',HospitalController.createHospital);

//Route to Activate/Deactivate Hospital//
//router.post('/update',HospitalController.handleHospital);

//Route To Delete Hospital
//router.delete('/:userId',HospitalController.deleteHospital);

module.exports=router;