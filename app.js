const helmet = require('helmet');
const express = require('express');
const app=express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');

const userRoutes=require('./Api/routes/user');
const hospitalroutes=require("./Api/routes/create-hospital");
const superadminroutes=require("./Api/routes/superadmin");
const doctorroutes=require("./Api/routes/doctor");
const appointmentRoutes = require('./Api/routes/appointments');

mongoose.connect(
    "mongodb://localhost/HMS",{ useNewUrlParser: true, useCreateIndex: true }
).then(() => {
    console.log("Connected to Database");
    })
    .catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });
mongoose.Promise=global.Promise;

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(helmet());

app.use("/user",userRoutes);
app.use("/create-hospital",hospitalroutes);
app.use("/superadmin",superadminroutes);
app.use("/doctor",doctorroutes);
app.use("/appointment",appointmentRoutes);
module.exports=app;