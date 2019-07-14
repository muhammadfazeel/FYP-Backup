const mongoose=require('mongoose');
const bcrpt=require('bcrypt');
const jwt=require('jsonwebtoken');

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
        hospitalid:user[0].hid
    },
    "secret",
    {
        expiresIn:"1h"
    });
        
    return res.status(200).json({
        message:"Auth Successful",
        token:token
    });
    }
    res.status(401).json({
        message:"Auth Failed"
    });
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
        