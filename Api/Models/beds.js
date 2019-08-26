const mongoose = require('mongoose');

const bedSchema = mongoose.Schema({
    
    hid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    },
    category:{
        type:String,
        require:true
    },
    number:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        require:true
    }
});
module.exports=mongoose.model('Beds',bedSchema);