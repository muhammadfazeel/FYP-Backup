const helmet = require('helmet');
const express = require('express');
const app=express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const path = require('path');
const expressValidator=require('express-validator');
const flash =require('connect-flash');
const session=require('express-session');
const methodOverride=require('method-override');
//var express_layout = require('express-ejs-layouts');


const userRoutes=require('./Api/routes/user');
const hospitalroutes=require("./Api/routes/create-hospital");
const superadminroutes=require("./Api/routes/superadmin");
const doctorroutes=require("./Api/routes/doctor");
const appointmentRoutes = require('./Api/routes/appointments');
const patientRoutes = require("./Api/routes/patient");
const adminRoutes=require('./Api/routes/admin');
const department=require('./Api/routes/department');

mongoose.connect(
    "mongodb://localhost/HMS",{ useNewUrlParser: true, useCreateIndex: true }
).then(() => {
    console.log("Connected to Database");
    })
    .catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });
mongoose.Promise=global.Promise;

//app.use(express_layout);
app.set('views',path.join( __dirname +'/views'));
app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));



app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(helmet());
app.use(methodOverride('_method'));
//Express Session middleware
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true
//   }));
  //Express Messages middleware
// app.use(require('connect-flash')());
// app.use(function (req, res, next) {
// res.locals.messages = require('express-messages')(req, res);
//   next();
// });
//Express Validator Middleware
// app.use(expressValidator({
//     errorFormatter:function(param,msg,value){
//         var namespace = param.split('.'),
//         root = namespace.shift(),
//         formparam = root;
//         while(namespace.length){
//             formparam += '[' + namespace.shift() + ']';
//         }
//         return{
//             param:formparam,
//             msg:msg,
//             value:value
//         };
//     }
// }))



//Routes
//Index Page
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/index',(req,res)=>{
    res.render('index');
})
//Route For Login and Signup page
app.get('/login',(req,res)=>{
    res.render('login');
});
app.get('/form',(req,res)=>{
    res.render('form');
});

//Routes For SuperAdmin
app.use('/superadmin',superadminroutes);
//Routes For Users
app.use("/user",userRoutes);
//Routes To Create Delete Update Activate and Deactivate Hospital
app.use("/create-hospital",hospitalroutes);
//Routes For Doctors
app.use("/doctor",doctorroutes);
//Routes For Appointments
app.use("/appointment",appointmentRoutes);
//Routes For Patients
app.use("/patient",patientRoutes);
//Routes For Admin
app.use('/admin',adminRoutes);
//Routes for Department
app.use('/department',department)

module.exports=app