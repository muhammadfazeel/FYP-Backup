const mongoose=require('mongoose');
const bcrpt=require('bcrypt');
const jwt=require('jsonwebtoken');

const Userdata = require("../Models/user");
const Doctor = require('../Models/doctor');
const AppointmentsData = require('../Models/appointments');

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
                                name:req.body.name,
                                email:req.body.email,
                                password:hash,
                                department:req.body.department,
                                address:req.body.address
                                
                            });
                            
                            doctor.save()
                            .then(result=>
                                {
                                const User= new Userdata
                                ({
                                    hid:req.userData.hospitalid,
                                    userId:result._id,
                                    name:req.body.name,
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
                            return  res.json({
                                    status:'success',
                                    
                                    redirect:'/doctor/signup',

                                });
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                            
                    }
                    
                })
              
            }
        
    })
    
    

};

//To Delete Doctor
exports.deleteDoctor=async (req,res,next)=>{
    let Hospital
    let User
  try {
    Hospital = await Doctor.findById(req.params.id)
    await Hospital.remove().then(async result=>{
        User= await Userdata.findOne({userId:req.params.id});
        await User.remove()
    })
    res.redirect('/doctor/doctorList')
  } catch {
    
      res.redirect('/doctor/doctorList')
  }

}
//To Get Todays Appointments
exports.getallAppointmentToday=async(req,res,next)=>{
    let App=await AppointmentsData.find({date:new Date()})
    console.log(App)
    return res.render('TodayAppointments',{
      posts:App
    })
}

//To Delete Appointment
exports.deleteReceptApp=async (req,res,next)=>{
    let App
  try {
    App = await AppointmentsData.findById(req.params.id)
    await App.remove()
    
    res.redirect('/doctor/Appointment')
  } catch {
    
      res.redirect('/doctor/Appointment')
  }
  
  }