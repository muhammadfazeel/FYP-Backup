const express = require('express');
const router=express.Router();

const auth= require('../middleware/check-auth');
const adminData = require('../Models/create-hospital');
const bedData = require('../Models/beds');


//Routes For To Get Admin Page
router.get('/Home',auth,(req,res)=>{
    res.render('admin');
})
//To Get Dashboard Data
router.get('/Dashboard',auth,(req,res)=>{
    res.render('admin');
})
//To Add Bed
router.get('/addbed',auth,(req,res)=>{
    res.render('addbed');
})
//To Add 
router.get('/AddDepartment',auth,(req,res)=>{
    res.render('adddepart');
})
//To Display and Update Admin Profile
router.get('/Profile',auth,async(req,res)=>{
    let Admin
    try {
      Admin = await adminData.findOne({_id:req.userData.hospitalid})
      return res.render('AdminProfile',{
      posts:Admin
    })
      
    } catch {
      
        
    }
  
});

//To Delete Bed By Admin
router.delete('/Deletebed/:id',auth,async(req,res)=>{
    let Ward
    try {
      BED = await bedData.findById(req.params.id)
      await BED.remove()
      
      res.redirect('/bed/wardsList')
    } catch {
      
        res.redirect('/bed/wardsList')
    }
  
  
})


//To Update Profile Data
// router.put('/:id',async (req,res)=>{   
//     Userdata.findOneAndUpdate({
//         id:req.userData.hospitalid
//     }).exec()
//     .then(user=>{

//                 bcrpt.hash(req.body.password,10,(err,hash)=>{
//                     if(err){
                        
//                         return res.status(500).json({
//                             error: err
                            
//                         });
                        
//                     }
//                         else{
//                             const hospital=new adminData ({
//                                 title:req.body.title,
//                                 email:req.body.email,
//                                 password:hash,
//                                 address:req.body.address,
//                                 phone:req.body.phone,
//                                 status:'Deactive'
//                             });
                            
//                             hospital.save()
                            
//                             .then(result=>{
//                                 const User= new Userdata({
//                                     hid:result._id,
//                                     name:req.body.title,
//                                     email:req.body.email,
//                                     password:hash,
//                                     phone:req.body.phone,
//                                     role:"admin"
//                                 });
//                                 User.save()
//                                 .then()
//                                 .catch(err=>{
//                                     console.log(err);
//                                 })
//                                 return  res.json({
//                                     status:'success',
                                    
//                                     redirect:'/login',

//                                 });
//                             })
//                             .catch(err=>{
//                                 console.log(err);
//                             })
                            
//                     }
                    
//                 })
//               //  console.log(hospitalid);
            
        
//     })
    
    
// })
module.exports=router;