const bcrpt=require('bcrypt');

const createHospital=require('../Models/create-hospital');
const Userdata=require('../Models/user');

//*******To Create Hospital*************//
exports.createHospital=(req,res,next)=>{
    Userdata.find({
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
                            const hospital=new createHospital ({
                                title:req.body.title,
                                email:req.body.email,
                                password:hash,
                                address:req.body.address,
                                phone:req.body.phone,
                                status:'Deactive'
                            });
                            
                            hospital.save()
                            
                            .then(result=>{
                                const User= new Userdata({
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
                                    
                                    redirect:'/login',

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