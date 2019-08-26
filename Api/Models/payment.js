const mongoose = require('mongoose');


const paymentSchema = mongoose.Schema({
    hid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    amount:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
        }
});
module.exports=mongoose.model('Payments',paymentSchema);