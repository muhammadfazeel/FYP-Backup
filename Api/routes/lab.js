const express = require('express');
const router=express.Router();
const LabData = require('../Models/lab');
const Userdata = require('../Models/user');

const checkauth=require('../middleware/check-auth');

router.get('/Home',checkauth,(req,res)=>{
  res.render('lab')
})

//To Delete Lab By Admin
router.delete('/:id',checkauth,async (req,res,next)=>{
    let Rece
    let User
  try {
    Rece = await LabData.findById(req.params.id)
    await Rece.remove().then(async result=>{
      User= await Userdata.findOne({userId:req.params.id});
      await User.remove()
  })
    
    res.redirect('/admin/alllab');
  } catch {
    
      res.redirect('/admin/alllab');
  }
})

module.exports=router;