const mongoose=require('mongoose');
const bcrpt=require('bcrypt');
const jwt=require('jsonwebtoken');

const UserData = require('../Models/user');
const HospitalData =require("../Models/create-hospital");
//**********To Get All Registered Hospitals************//
exports.GetData= async (req,res,next)=>{
    let result =await HospitalData.find().select('-password -patient_limit -dr_limit');
     return  res.render('superadmin',{
         posts:result
     })
}
//**********To Get All Registered Hospitals************//
exports.Getinfo= async (req,res,next)=>{
    let result =await HospitalData.find().select('-password -patient_limit -dr_limit');
     return  res.render('hospitals',{
         posts:result
     })
}
//*********To Delete Hospital ****************//

exports.deleteHospital=async (req,res,next)=>{
    let Hospital
    let User
  try {
    Hospital = await HospitalData.findById(req.params.id)
    await Hospital.remove().then(async result=>{
        User= await UserData.findOne({hid:req.params.id});
        await User.remove()
    })
    res.redirect('/superadmin/allhospitals')
  } catch {
    
      res.redirect('/superadmin/allhospitals')
  }

}

//**************To Update SuperAdmin Info*************//
exports.updateProfile= async (req,res,next)=>{
    let result =await UserData.findOne({id:req.userData.id});
  //  console.log(result);
     return  res.render('superprofile',{posts:result})
     
}


//*******************To Activate and Deactivate Hospital****************/
exports.Activate= async (req,res,next)=>{
    let Status
    try{ 
        Status = await HospitalData.findById(req.params.id)
        Status.status="Active"
        await Status.save()
        res.redirect('/superadmin/allhospitals');
    }catch{
console.log('Error Here');
    }
}

exports.Deactivate= async (req,res,next)=>{
    let Status
    try{ 
        Status = await HospitalData.findById(req.params.id)
        Status.status="Deactive"
        await Status.save()
        res.redirect('/superadmin/allhospitals');
    }catch{
console.log('Error Here');
    }
}

//*******To Create Hospital*************//
exports.createHospital=(req,res,next)=>{
    UserData.find({
        email:req.body.email
    }).exec()
    .then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:'Email Already Exists',
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
                            const hospital=new HospitalData ({
                                title:req.body.title,
                                email:req.body.email,
                                password:hash,
                                address:req.body.address,
                                phone:req.body.phone,
                                status:'Deactive'
                            });
                            
                            hospital.save()
                            
                            .then(result=>{
                                const User= new UserData({
                                    hid:result._id,
                                    name:req.body.title,
                                    email:req.body.email,
                                    password:hash,
                                    phone:req.body.phone,
                                    role:"admin"
                                });
                                User.save()
                                .then()
                                .catch(err=>{
                                    console.log(err);
                                })
                                return  res.json({
                                    status:'success',
                                    
                                    redirect:'/superadmin/allhospitals',

                                });
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                            
                    }
                    
                })
              //  console.log(hospitalid);
            }
        
    })
    
 

};