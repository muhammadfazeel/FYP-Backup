const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    hid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hospital"
    },
    date: {
		type: Date,
		required: [true, "Date is required."],
		min: new Date(+Date.now() - 7*24*60*60*1000),
	},
	patientid: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
	},
	doctorid:{
		type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
	},
	patient:{
		type:String,
		require:true
	},
	dr:{
		type:String,
		require:true
	},
	status:{
		type:String,
		require:true
	}
});

module.exports=mongoose.model('Appointments',AppointmentSchema);