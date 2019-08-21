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
	complain: {
		type: String,
		required: [true, "Complain is required."],
		minlength: 10,
	},
	name: {
		type: String,
		required: [true, "User adding question is required."]
	},
	_userID: {
		type: String,
		required: true
	}
}, { timestamps: true });

module.exports=mongoose.model('Appointments',AppointmentSchema);