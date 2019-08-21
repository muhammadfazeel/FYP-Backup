const mongoose = require('mongoose');


const departmentSchema = mongoose.Schema({
    hid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    },
    name:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
        }
});
module.exports=mongoose.model('Departments',departmentSchema);