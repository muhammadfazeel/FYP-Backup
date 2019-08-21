const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    
    hid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type: String,
        validate: {
            validator: function(v) {
              return /\d{4}-\d{7}/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
          },
          require:true
    }, role:{
        type:String,
        require:true
    }
});
module.exports=mongoose.model('User',userSchema);