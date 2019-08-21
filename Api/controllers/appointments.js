const Appointment = require('../Models/appointments');


exports.getallAppointment=(req,res,next)=>{
    
    Appointment.find({}, function(err, appointments) {
        if(err){
            return res.status(400).json(err)
        }
        else{
            return res.json(appointments)
        }
    })
}


//To delete Appointment 
exports.deleteAppointment=(req,res,next)=>{
    Appointment.findOneAndRemove({'_id': req.params.id}, function(err, response) {
        if(err) {
            return res.status(402).json(err)
        }
        else{
            return res.json(response)
        }
    })
}

//To Add New Appointment
exports.addAppointment=(req,res,next)=>{
    Appointment.find({'date': req.body.date}, function(err, response) {
        if(err) {
            return res.status(402).json(err)
        }
        else if(response.length > 2){
            return res.status(403).json('Doctor already has three appointments this day. Please select a different day.')
        }
        else{
            Appointment.find({'_userID': req.body._userID, 'date': req.body.date}, function(err, response) {
                if(err) {
                    return res.status(402).json(err)
                }
                else if(response.length > 0){
                    return res.status(403).json('You already have an appointment scheduled for this day. Please select a different day.')
                }
                else{
                    Appointment.find({'date': req.body.date, 'time': {$gt: req.body.time-20, $lt: req.body.time+20}}, function(err, response) {
                        if(err) {
                            return res.status(402).json(err)
                        }
                        else if(response.length > 0){
                            return res.status(403).json('This appointment time is unavailable. Appointments must be scheduled at least 20 minutes apart. Please choose a different time.')
                        }
                        else{
                            let appointment = new Appointment({
                                hid:req.userData.hospitalid,
                                _userID:req.userData.userId,
                                name:req.userData.name,
                                complain:req.body.complain,
                                date:req.body.date,
                                time:req.body.time,
                           });
                            appointment.save( err => {
                                if(err) {
                                    console.log(err);
                                    return res.status(402).json(err);
                                }
                                else{
                                    console.log(appointment);
                                    return res.json(appointment)
                                }
                            })
                        }

                    })
                }
            })
        }
    })
}
