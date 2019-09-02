const mongoose = require('mongoose');

const historySchema = mongoose.Schema({
    
    hid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    },
    Pid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    Did:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    Pemail:{
        type:String
    },
    Pname:{
        type:String,
        require:true,
    },
    Dname:{
        type:String,
        require:true
    },
    symptoms:{
        type:String,
    },
    diagnosis:{
        type:String,
        require:true
    },
    medicines:{
        type:String,
        require:true
    },
    note:{
        type:String,
        require:true
    }
});
module.exports=mongoose.model('History',historySchema);