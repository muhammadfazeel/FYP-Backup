const mongoose=require('mongoose');
const bcrpt=require('bcrypt');
const jwt=require('jsonwebtoken');

const Userdata = require("../Models/user");
const Doctor = require('../Models/doctor');

exports.signupDoctor=(req,res,next)=>{
    Userdata.find({
        email:req.body.email
    }).exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:'Email Already Exists'
            });
        }
            else{
                
                bcrpt.hash(req.body.password,10,(err,hash)=>{
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    }
                        else{
                            
                            const doctor=new Doctor ({
                                hid:req.userData.hospitalid,
                                name:req.body.title,
                                email:req.body.email,
                                password:hash,
                                department:req.body.department,
                                address:req.body.address
                                
                            });
                            
                            doctor.save()
                            .then(result=>
                                {
                                console.log(result);
                                
                                res.status(201).json({
                                
                                message:'Doctor Created'
                                
                            });
                                const User= new Userdata
                                ({
                                    hid:req.userData.hospitalid,
                                    name:req.body.title,
                                    email:req.body.email,
                                    password:hash,
                                    phone:req.body.phone,
                                    role:"doctor"
                                });
                                User.save()
                                .then()
                                .catch(err=>{
                                    console.log(err);
                                })
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                            
                    }
                    
                })
              
            }
        
    })
    
    

};