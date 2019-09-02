const bcrpt= require('bcrypt')

const Userdata = require('../Models/user');
const Recept= require('../Models/Recep');
const AppointmentData = require('../Models/appointments');

//To Create Recep
exports.CreateRecep = (req, res, next) => {
  Userdata.find({
    email: req.body.email
  })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Email Already Exists"
        });
      } else {
        bcrpt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const recept = new Recept({
              hid: req.userData.hospitalid,
              name: req.body.name,
              email: req.body.email,
              password: hash,
              phone:req.body.phone
            });
            recept.save()
              .then(result => {
                const User = new Userdata({
                  hid: req.userData.hospitalid,
                  userId: result._id,
                  name: req.body.name,
                  email: req.body.email,
                  password: hash,
                  phone: req.body.phone,
                  role: "recep"
                });
                User.save()
                  .then()
                  .catch(err => {
                    console.log(err);
                  });
                return res.json({
                  status: "success",
                  redirect: "/recep/allRecep"
                });
              })
              .catch(err => {
                console.log(err);
              });
          }
        });
      }
    });
};

//To Get All Recep
exports.GetRecep= async (req,res,next)=>{
  let result =await Recept.find({hid:req.userData.hospitalid})
  return  res.render('allRecepAdmin',{
      posts:result
  })
}
//To Delete Receptionist
exports.deleteRecept=async (req,res,next)=>{
  let Rece
  let User
try {
  Rece = await Recept.findById(req.params.id)
  await Rece.remove().then(async result=>{
    User= await Userdata.findOne({userId:req.params.id});
    await User.remove()
})
  
  res.redirect('/recep/allRecep')
} catch {
  
    res.redirect('/recep/allRecep')
}

}
//To Delete Appointment
exports.deleteReceptApp=async (req,res,next)=>{
  let App
try {
  App = await AppointmentData.findById(req.params.id)
  await App.remove()
  
  res.redirect('/recep/allAppointments')
} catch {
  
    res.redirect('/recep/allAppointments')
}

}