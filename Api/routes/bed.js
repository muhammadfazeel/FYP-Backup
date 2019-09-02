const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const patientcontroller = require("../controllers/patient");
const wardData = require("../Models/wards");
const bedData = require('../Models/beds');

//To get add bed Page
router.get("/addbed", checkAuth, async (req, res) => {
  let Data = await wardData.find({ hid: req.userData.hospitalid });
  return res.render("addbed", {
    posts: Data
  });

  // res.render('addbed');
});
//To create Hospital Ward
router.post("/addWard", checkAuth, (req, res, next) => {
  wardData
    .find({
      ward: req.body.ward
    })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Ward Already Exists"
        });
      } else {
        const newWard = new wardData({
          hid: req.userData.hospitalid,
          ward: req.body.ward,
          description: req.body.description
        });
        newWard.save().catch(err=>{
            console.log(err);
        })
        return  res.json({
            status:'success',
            
            redirect:'/bed/addbed',

        });
      }
    })
});
//To Create Ward Bed
router.post("/addWardBed", checkAuth, (req, res, next) => {
    bedData.find({
        number:req.body.number,
        wardid:req.body.wardid
      })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "Bed Already Exists"
          });
        } else {
          let bedbed = new bedData({
            hid: req.userData.hospitalid,
            wardid:req.body.wardid,
            ward: req.body.ward,
            number: req.body.number,
            status:"Available"
          });
          bedbed.save().catch(err=>{
              console.log(err);
          })
          return  res.json({
              status:'success',
              
              redirect:'/bed/addbed',
  
          });
        }
      }).catch(err=>{
          console.log(err);
      })
  });
module.exports = router;


//To Create Bed List
router.get('/wardsList',checkAuth,async (req,res)=>{
    let WData = await wardData.find({ hid: req.userData.hospitalid });
  return res.render("WardList", {
    posts: WData
  });
  
})
//To Delete Hospital Wards
router.delete('/:id',checkAuth,async (req,res)=>{
        let Ward
      try {
        Ward = await wardData.findById(req.params.id)
        await Ward.remove()
        
        res.redirect('/bed/wardsList')
      } catch {
        
          res.redirect('/bed/wardsList')
      }
    
    
})
//To Get Bed Of Specific Ward
router.get('/BedList/:id',checkAuth,async(req,res)=>{
    let BData = await bedData.find({wardid:req.params.id});
  return res.render("AdminBedList", {
    posts: BData
  });
})
//To Delete Bed Of Specific Ward
router.delete('/doctorBed/:id',checkAuth,async(req,res)=>{
    let Ward
    try {
      BED = await bedData.findById(req.params.id)
      await BED.remove()
      
      res.redirect('/bed/BedList')
    } catch {
      
        res.redirect('/bed/BedList')
    }
  
  
})
