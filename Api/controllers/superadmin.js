const mongoose=require('mongoose');
const bcrpt=require('bcrypt');
const jwt=require('jsonwebtoken');

const HospitalData =require("../Models/create-hospital");
//**********To Get All Registered Hospitals************//
exports.GetData= async (req,res,next)=>{
    let result =await HospitalData.find().select('-password -patient_limit -dr_limit');
    res.send(result);
}