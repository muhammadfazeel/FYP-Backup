const mongoose = require('mongoose');

const LabTestSchema = mongoose.Schema({
    
    hid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    },
    doctorid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    labid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "lab"
    },
    patientid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
    test:{
        type:String,
        require:true,
    },
    details:{
        type:String
    },doctorname:{
        type:String
    },patientname:{
        type:String
    }
});
module.exports=mongoose.model('Lab Test Data',LabTestSchema);