const mongoose = require('mongoose');


const paymentSchema = mongoose.Schema({
    hid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    },
    Did:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor" 
    }
    ,
    Pid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    total:{
        type:String,
        require:true,
    },
});
module.exports=mongoose.model('Payments',paymentSchema);