const bcrpt=require('bcrypt');

const Userdata = require("../Models/user");
const Patient = require('../Models/patient');
const Appointment = require('../Models/appointments');


// To Create Hospital
exports.createPatient=(req,res,next)=>{
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
                            
                            const patient=new Patient ({
                                hid:req.userData.hospitalid,
                                name:req.body.name,
                                email:req.body.email,
                                password:hash,
                                gender:req.body.gender,
                                blood:req.body.blood,
                                age:req.body.age,
                                address:req.body.address,
                                phone:req.body.phone,
                                role:"patient"
                                
                            });
                            
                            patient.save()
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
                                    role:"patient"
                                });
                                User.save()
                                .then()
                                .catch(err=>{
                                    console.log(err);
                                })
                                res.json({
                                    redirect : ''
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
//To Get Patients For REcep
exports.getPatientinfo=async (req,res,next)=>{
    let result =await Patient.find({hid:req.userData.hospitalid})
    return  res.render('patientListRecep',{
        posts:result
    })
}


//To Get All Patients
exports.getPatient=async (req,res,next)=>{
    let result =await Patient.find({hid:req.userData.hospitalid})
    return  res.render('patientlistadmin',{
        posts:result
    })
}
//To Delete patient By Recep
exports.delPatientRecep=async (req,res,next)=>{
    let Hospital
    let User
    let App
  try {
    Hospital = await Patient.findById(req.params.id)
    await Hospital.remove().then(async result=>{
        User= await Userdata.findOne({userId:req.params.id});
        await User.remove().then(async Ans=>{
        App = await Appointment.find({patientid:req.params.id});
        await App.remove()
        })
    })
    res.redirect('/patient/patientListRecep')
  } catch {
    
      res.redirect('/patient/patientListRecep')
  }

}
//To Delete patient
exports.delPatient=async (req,res,next)=>{
    let Hospital
    let User
  try {
    Hospital = await Patient.findById(req.params.id)
    await Hospital.remove().then(async result=>{
        User= await Userdata.findOne({userId:req.params.id});
        await User.remove()
    })
    res.redirect('/patient/patientlist')
  } catch {
    
      res.redirect('/patient/patientlist')
  }

}
