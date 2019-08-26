const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const doctorcontroller = require("../controllers/doctor");
const DoctorSchema = require("../Models/doctor");
const Patient = require("../Models/patient");

//To Get Doctor Main Page
router.get("/Home", checkAuth, (req, res) => {
  res.render("doctor");
});
//To Get Appointments page
router.get("/Appointment", checkAuth, (req, res) => {
  res.render("appointmentsdoctor");
});
//Prescription
router.get("/prescription", checkAuth, (req, res) => {
  res.render("prescription");
});
//Doctor Profile
router.get("/Profile", checkAuth, async (req, res) => {
  let DoctorData = await DoctorSchema.find({ _id: req.userData.uid });
  console.log(DoctorData);
  return res.render("Doctor-Profile", {
    posts: DoctorData
  });
});

//To Get Doctor Apponintment List
router.get("/Appointment", checkAuth, doctorcontroller.getDoctorAppointments);

//**********Create Doctor***********//
router.post("/signup", checkAuth, doctorcontroller.signupDoctor);
router.get("/signup", checkAuth, (req, res) => {
  res.render("adddoctor");
});
//To Get Doctors Of Specific Hospital
router.get("/doctorList", checkAuth, async (req, res) => {
  let DoctorData = await DoctorSchema.find({ hid: req.userData.hospitalid });
  return res.render("doctorlist", {
    posts: DoctorData
  });
  // res.render("addappointmentsadmin");
});
//To Add Doctor Schedule
//Get Page
router.get("/schedule", checkAuth, (req, res) => {
  res.render("DoctorSchedule");
});
//Doctor Schedule
router.get("/addSchedule", checkAuth, (req, res) => {
  res.render("DoctorSchedule");
});
//To Delete Doctor
router.delete("/:id", checkAuth, doctorcontroller.deleteDoctor);
router.get("/patientlist", checkAuth, async (req, res) => {
  let result = await Patient.find({ hid: req.userData.hospitalid });
  return res.render("patientlistdoctor", {
    posts: result
  });
});

module.exports = router;
