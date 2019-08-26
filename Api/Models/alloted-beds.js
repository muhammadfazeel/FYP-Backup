const mongoose = require('mongoose');

const allotedBeds = mongoose.Schema({
    
    hid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    },
    bedid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Bed"
    },
    category:{
        type:String,
        require:true
    },
    number:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    }
    ,
    description:{
        type:String,
    },
    status:{
        type:String,
        require:true
    },
    x:{

    }
});
module.exports=mongoose.model('Alloted-beds',allotedBeds);