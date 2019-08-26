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
	time: {
		type: Number,
		required: [true, "Time is required."],
		min: [480, "Too early"],
		max: [1020, "Too late"],
	},
	patientid: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
	},
	doctorid:{
		type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    
	}
}, { timestamps: true });

module.exports=mongoose.model('Appointments',AppointmentSchema);