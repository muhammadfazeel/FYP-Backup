const mongoose=require('mongoose');
const bcrpt=require('bcrypt');
const jwt=require('jsonwebtoken');
const storage = require('node-sessionstorage');

const HospitalData = require('../Models/create-hospital');
const User = require("../Models/user");


//*******To Signup into Data*************//
exports.user_signup=(req,res,next)=>{
    User.find({
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
                            const user=new User({
                                _id:new mongoose.Types.ObjectId(),
                                email:req.body.email,
                                password:hash,
                                phone:req.body.phone,
                                role:"superadmin"
                            });
                            user.save()
                            .then(result=>{
                                console.log(result);
                                res.status(201).json({
                                    message:'User Created'
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
//*******Login To Data*************//
exports.User_signin=(req,res,next)=>{
    User.find({
        email:req.body.email
    })
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:'Auth Fail'
            });
        }
    bcrpt.compare(req.body.password,user[0].password,(err,result)=>{
    if(err){
        return res.status(401).json({
            message:'Auth Failed'
        });
    }
    if(result)
    {
    const token =  jwt.sign(
    {
        email:user[0],
        userId:user[0]._id,
        uid:user[0].userId,
        hospitalid:user[0].hid,
        name:user[0].name,
        role:user[0].role
    },
    "secret",
    {
        expiresIn:"1h"
    });
    if(user[0].role==="superadmin"){
        storage.setItem('data',token);
      return  res.json({
        authsuccess: true,
        description: 'Sending the Access Token',
        accessToken: token,
        redirect:'/superadmin/superadmin'
    });
      }
    
    else if(user[0].role==="admin"){
        console.log('Here We Are')
        //console.log(user[0].hid);
       HospitalData.findOne({_id:user[0].hid.toString()}).then(response=>{
        
        if(response.status==='Active'){ 
            
            storage.setItem('data',token);  
             return res.json({
                accessToken: token,
                redirect:'/admin/Home'
            })
            }else{
                res.json({redirect:'/login'})
            }
       }).catch(err=>{
           res.json('ERERERER')
       })
   
        
        
    }
    else if(user[0].role==="doctor"){
        
        HospitalData.findOne({_id:user[0].hid.toString()}).then(response=>{
            if(response.status==='Active'){ 
                storage.setItem('data',token);  
                 return res.json({
                    accessToken: token,
                    redirect:'/doctor/Home'
                })
                }else{
                    res.json({redirect:'/login'})
                }
           }).catch(err=>{
               res.json('ERERERER')
           })
       }
    else if ( user[0].role==="recep"){
        HospitalData.findOne({_id:user[0].hid.toString()}).then(response=>{
            if(response.status==='Active'){ 
                storage.setItem('data',token);  
                 return res.json({
                    accessToken: token,
                    redirect:'/recep/Home'
                })
                }else{
                    res.json({redirect:'/login'})
                }
           }).catch(err=>{
               res.json('ERERERER')
           })
    }
}
    
    // res.status(401).json({
    //     message:"Auth Failed"
    // });
        });
    }).catch(
        err=>{
            console.log(err);
            res.status(500).json(
                {
                    error:err
                })
    });
    }
//*******To Delete Data*************//
    exports.User_delete=(req,res,next)=>{
       const id=req.params.userId;
       User.deleteOne({_id:id})
       .exec()
       .then(
           result=>{
                res.status(200).json({
                    message:"User Deleted"
                })
           }
       )
       .catch(err=>{
           error:err
       });
           
       
}
        