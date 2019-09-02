const mongoose = require('mongoose');


const WardsSchema = mongoose.Schema({
    hid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    },
    ward:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
        }
});
module.exports=mongoose.model('Wards Category',WardsSchema);