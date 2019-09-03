const mongoose = require('mongoose');

const LabTestReportSchema = mongoose.Schema({
    
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
    },test:{
type:String
    }
,    result:{
        type:String,
        require:true,
    },
    details:{
        type:String
    },status:{
        type:String
    },Drstatus:{
        type:String
    }
});
module.exports=mongoose.model('Lab Test Report',LabTestReportSchema);