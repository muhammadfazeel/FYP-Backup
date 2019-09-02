const mongoose = require('mongoose');

const bedSchema = mongoose.Schema({
    
    hid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    },
    ward:{
        type:String,
        require:true
    },
    wardid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ward"
    },
    
    number:{
        type:String,
        require:true
    },
    status:{
        type:String,
        require:true
    }
});
module.exports=mongoose.model('Beds',bedSchema);