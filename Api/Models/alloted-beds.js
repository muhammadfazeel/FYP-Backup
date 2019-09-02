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
    Pid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Patient"
    },
    Pname:{
        type:String
    },
    ward:{
        type:String,
        require:true
    },
    bednum:{
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
    }
});
module.exports=mongoose.model('Alloted-beds',allotedBeds);