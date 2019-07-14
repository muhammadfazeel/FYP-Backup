const mongoose = require('mongoose');
const User=require('../Models/user');

const hospitalSchema = mongoose.Schema({
    
    title:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{
        type:String,
        require:true
    },
    address:{
    type:String,
    require:true
    },
   
    patient_limit:{
        type:Number,
        require:true
    },
    dr_limit:{
        type:Number,
        require:true
    }
});
module.exports=mongoose.model('hospital',hospitalSchema);