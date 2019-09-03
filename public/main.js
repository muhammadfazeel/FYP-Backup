//for signup
$(document).ready(function() {
  $("#create").submit(function() {
    var mytitle = $("#titleid").val();
    var myemail = $("#emailid").val();
    var mypassword = $("#passwordid").val();
    var myaddress = $("#addressid").val();
    var myphone = $("#phoneid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/create-hospital/create",
      dataType: "json",
      data: {
        title: mytitle,
        email: myemail,
        password: mypassword,
        address: myaddress,
        phone: myphone
      },

      success: function(res) {
        alert("Account created successfuly ");
        if (res.status === "success") {
          window.location = res.redirect;
        }
      },
      error: function(err) {
        alert("Email Already Exist");
      }
    });
    return false;
  });
});

//for login and jwt token

$(document).ready(function() {
  $("#form").submit(function() {
    var myemail = $("#emailid").val();
    var mypassword = $("#passwordid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/user/login",
      data: {
        email: myemail,
        password: mypassword
      },

      success: function(res) {
        window.location = res.redirect;
      },
      error: function(err) {
        alert("Please Enter Correct Information");
      }
    });
    return false;
  });
});

//To Create Doctor
$(document).ready(function() {
  $("#Doctor").submit(function() {
    var mytitle = $("#nameid").val();
    var myemail = $("#emailid").val();
    var mypassword = $("#passwordid").val();
    var myaddress = $("#addressid").val();
    var myspec = $("#departmentid").val();
    var myphone = $("#phoneid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/doctor/signup",
      dataType: "json",
      data: {
        name: mytitle,
        email: myemail,
        password: mypassword,
        address: myaddress,
        department: myspec,
        phone: myphone
      },

      success: function(res) {
        alert("Doctor created successfuly ");
        if (res.status === "success") {
          window.location = res.redirect;
        }
      },
      error: function(err) {
        alert("Email Already Exist");
      }
    });
    return false;
  });
});

//To Create Department
$(document).ready(function() {
  $("#Depart").submit(function() {
    var mytitle = $("#nameid").val();
    var myemail = $("#desid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/department/addDepartment",
      dataType: "json",
      data: {
        name: mytitle,
        description: myemail
      },

      success: function(res) {
        alert("Department created successfuly ");
        if (res.status === "success") {
          window.location = res.redirect;
        }
      },
      error: function(err) {
        alert("Department Already Exist");
      }
    });
    return false;
  });
});

//To Create Receptionist
$(document).ready(function() {
  $("#Recep").submit(function() {
    var mytitle = $("#nameid").val();
    var myemail = $("#emailid").val();
    var mypassword = $("#passwordid").val();
    var myphone = $("#phoneid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/recep/Receptionist",
      dataType: "json",
      data: {
        name: mytitle,
        email: myemail,
        password: mypassword,
        phone: myphone
      },

      success: function(res) {
        alert("Receptionist created successfuly ");
        if (res.status === "success") {
          window.location = res.redirect;
        }
      },
      error: function(err) {
        alert("Email Already Exist");
      }
    });
    return false;
  });
});
//To Add Appointment
$(document).ready(function() {
  $("#Appointment").submit(function() {
    var drname = $("#doctorid option:selected").text();
    var ptname = $("#patientid option:selected").text();
    var mypatient = $("#patientid").val();
    var mydoctor = $("#doctorid").val();
    var mydate = $("#dateid").val();
    //var mytime = $('#timeid').val().toString();
    $.ajax({
      global: false,
      type: "post",
      url: "/appointment/addApp",
      data: {
        patientid: mypatient,
        doctorid: mydoctor,
        date: mydate,
        patient: ptname,
        dr: drname
        //time:mytime
      },
      success: function(res) {
        alert("Appointment created successfuly ");
        if (res.status === "success") {
          // window.location = res.redirect
        }
      },
      error: function(err) {
        alert("Please Change Value");
      }
    });
    return false;
  });
});
//To Add Patient
$(document).ready(function() {
  $("#CreatePatient").submit(function() {
    var mytitle = $("#nameid").val();
    var myemail = $("#emailid").val();
    var mypassword = $("#passwordid").val();
    var myaddress = $("#bloodid").val();
    var myspec = $("#genderid").val();
    var myphone = $("#phoneid").val();
    var myage = $("ageid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/patient/enter-patient",
      dataType: "json",
      data: {
        name: mytitle,
        email: myemail,
        password: mypassword,
        blood: myaddress,
        gender: myspec,
        phone: myphone,
        age: myage
      },

      success: function(res) {
        alert("Patient created successfuly ");
        if (res.status === "success") {
          window.location = res.redirect;
        }
      },
      error: function(err) {
        alert("Email Already Exist");
      }
    });
    return false;
  });
});

//To Add Hospital Wards
$(document).ready(function() {
  $("#addWard").submit(function() {
    var myward = $("#wardid").val();
    var mydesc = $("#descriptionid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/bed/addWard",
      dataType: "json",
      data: {
        ward: myward,
        description: mydesc
      },
      success: function(res) {
        alert("Ward created successfuly ");
        if (res.status === "success") {
          window.location = res.redirect;
        }
      },
      error: function(err) {
        alert("Ward Already Exist");
      }
    });
    return false;
  });
});

//To Create bed
$(document).ready(function() {
  $("#addbed").submit(function() {
    var myname = $("#nameid option:selected").text();
    var wardsid = $("#nameid").val();
    var mynumber = $("#numberid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/bed/addWardBed",
      data: {
        ward: myname,
        number: mynumber,
        wardid: wardsid
      },
      success: function(res) {
        alert("Bed created successfuly ");
        if (res.status === "success") {
          window.location = res.redirect;
        }
      },
      error: function(err) {
        alert("Bed Already Exist");
      }
    });
    return false;
  });
});

//To Update
$(function() {
  $("#Prescription").submit(function() {
    var ptid = $("#ptid").val();
    var ptemail = $("#ptemail").val();
    var drname = $("#drname").val();
    var drid = $("#drid").val();
    console.log(ptid);
    console.log(ptemail);
    console.log(drname);
    $.ajax({
      type: "post",
      url: "/doctor/prescription?_method=get",
      data: {
        patientid: ptid,
        patient: ptemail,
        doctorid: drid,
        dr: drname
      },
      success: function(res) {
        window.location = res.redirect;
      },
      error: function(err) {
        alert(" Something Wrong");
      }
    });
    return false;
  });
});
//To Create prescription and save to database for history
$(function() {
  $("#MedPress").submit(function() {
    var hospitalid = $("#hid").val();
    var ptname = $("#ptname").val();
    var ptemail = $("#ptemail").val();
    var ptid = $("#ptid").val();
    var drname = $("#drname").val();
    var drid = $("#drid").val();
    var sym = $("#symptoms").val();
    var diag = $("#diagnosis").val();
    var med = $("#med").val();
    var not = $("#note").val();
    $.ajax({
      type: "post",
      url: "/doctor/MedHistory",
      data: {
        hid: hospitalid,
        patientid: ptid,
        patientemail: ptemail,
        doctorid: drid,
        doctorname: drname,
        patientname: ptname,
        symptoms: sym,
        diagnosis: diag,
        medicine: med,
        note: not
      },
      success: function(res) {
        alert("Saved");
        window.location = res.redirect;
      },
      error: function(err) {
        alert(" Something Wrong");
      }
    });
    return false;
  });
});

//To Allot Bed
$(function() {
  $("#AllotBed").submit(function() {
    var wardname = $("#wardname").val();
    var ptid = $("#patientid").val();
    var ptname = $("#patientid option:selected").text();
    var bedid = $("#bedid").val();
    var bednum = $("#bedid option:selected").text();
    var des = $("#des").val();
    $.ajax({
      type: "post",
      url: "/doctor/AllotBed",
      data: {
        bedid: bedid,
        Pid: ptid,
        Pname: ptname,
        ward: wardname,
        description: des,
        bednum: bednum
      },
      success: function(res) {
        alert("Alloted");
        window.location = res.redirect;
      },
      error: function(err) {
        console.log(err);
        alert(" Something Wrong" + err);
      }
    });
    return false;
  });
});

$(function() {
  $("#payment").submit(function() {
    var Pid = $("#Pname").val();
    var Pname = $("#Pname option:selected").text();
    var Did = $("#Dname").text();

    var Dname = $("#Dname option:selected").text();
    var total = $("#total").text();
    $.ajax({
      type: "post",
      url: "/recep/Addpayment",
      data: {
        Pid: Pid,
        Pname: Pname,
        Did: Did,
        Dname: Dname,
        total: total
      },
      success: function(res) {
        alert("Payment Added");
        window.location = res.redirect;
      },
      error: function(err) {
        console.log(err);
        alert(" Something Wrong");
      }
    });
    return false;
  });
});
//Update SuperAdmin
$(function() {
  $("#update").submit(function() {
    var id = $("#id").val();
    var email = $("#emailid").val();
    var password = $("#passwordid").val();
    $.ajax({
      type: "post",
      url: "/superadmin/update",
      data: {
        id: id,
        email: email,
        password: password
      },
      success: function(res) {
        alert("Updated Added");
        window.location = res.redirect;
      },
      error: function(err) {
        console.log(err);
        alert(" Something Wrong");
      }
    });
    return false;
  });
});
//Update Doctor Profile
$(document).ready(function() {
  $("#DoctorUpdate").submit(function() {
    var id = $("#id").val();
    var userId = $("#userid").val();
    var mytitle = $("#nameid").val();
    var myemail = $("#emailid").val();
    var mypassword = $("#passwordid").val();
    var myaddress = $("#addressid").val();
    var myphone = $("#phoneid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/doctor/update",
      dataType: "json",
      data: {
        id: id,
        userId: userId,
        name: mytitle,
        email: myemail,
        password: mypassword,
        address: myaddress,
        phone: myphone
      },

      success: function(res) {
        if (res.status === "success") {
          window.location = res.redirect;
        }
      },
      error: function(err) {
        alert("Fail");
      }
    });
    return false;
  });
});
//Update Admin Profile
$(document).ready(function() {
  $("#UpdateAdmin").submit(function() {
    var id = $("#id").val();
    var userId = $("#userid").val();
    var mytitle = $("#nameid").val();
    var myemail = $("#emailid").val();
    var mypassword = $("#passwordid").val();
    var myphone = $("#phoneid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/admin/update",
      dataType: "json",
      data: {
        id: id,
        userId: userId,
        name: mytitle,
        email: myemail,
        password: mypassword,
        phone: myphone
      },

      success: function(res) {
        if (res.status === "success") {
          window.location = res.redirect;
        }
      },
      error: function(err) {
        alert("Fail");
      }
    });
    return false;
  });
});
//Update Receptionist Profile
$(document).ready(function() {
  $("#RecepUpdate").submit(function() {
    var id = $("#id").val();
    var userId = $("#userid").val();
    var mytitle = $("#nameid").val();
    var myemail = $("#emailid").val();
    var mypassword = $("#passwordid").val();
    var myaddress = $("#addressid").val();
    var myphone = $("#phoneid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/recep/update",
      dataType: "json",
      data: {
        id: id,
        userId: userId,
        name: mytitle,
        email: myemail,
        password: mypassword,
        address: myaddress,
        phone: myphone
      },

      success: function(res) {
        if (res.status === "success") {
          window.location = res.redirect;
        }
      },
      error: function(err) {
        alert("Fail");
      }
    });
    return false;
  });
});
//Update Lab Profile
$(document).ready(function() {
  $("#RecepUpdate").submit(function() {
    var id = $("#id").val();
    var userId = $("#userid").val();
    var mytitle = $("#nameid").val();
    var myemail = $("#emailid").val();
    var mypassword = $("#passwordid").val();
    var myaddress = $("#addressid").val();
    var myphone = $("#phoneid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/lab/update",
      dataType: "json",
      data: {
        id: id,
        userId: userId,
        name: mytitle,
        email: myemail,
        password: mypassword,
        address: myaddress,
        phone: myphone
      },

      success: function(res) {
        if (res.status === "success") {
          window.location = res.redirect;
        }
      },
      error: function(err) {
        alert("Fail");
      }
    });
    return false;
  });
});




//Update Patient Profile
$(document).ready(function() {
  $("#UpdatePatient").submit(function() {
    var id = $("#id").val();
    var userId = $("#userid").val();
    var mytitle = $("#nameid").val();
    var myemail = $("#emailid").val();
    var mypassword = $("#passwordid").val();
    var myaddress = $("#addressid").val();
    var myphone = $("#phoneid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/patient/update",
      dataType: "json",
      data: {
        id: id,
        userId: userId,
        name: mytitle,
        email: myemail,
        password: mypassword,
        address: myaddress,
        phone: myphone
      },

      success: function(res) {
        if (res.status === "success") {
          window.location = res.redirect;
        }
      },
      error: function(err) {
        alert("Fail");
      }
    });
    return false;
  });
});

//To Create Lab
$(document).ready(function() {
  $("#Lab").submit(function() {
    var mytitle = $("#nameid").val();
    var myemail = $("#emailid").val();
    var mypassword = $("#passwordid").val();
    var myphone = $("#phoneid").val();
    $.ajax({
      global: false,
      type: "post",
      url: "/admin/lab",
      dataType: "json",
      data: {
        name: mytitle,
        email: myemail,
        password: mypassword,
        phone: myphone
      },

      success: function(res) {
        alert("Lab created successfuly ");
        if (res.status === "success") {
          window.location = res.redirect;
        }
      },
      error: function(err) {
        alert("Email Already Exist");
      }
    });
    return false;
  });
});
//For Lab Test
$(function() {
  $("#labtest").submit(function() {
    var ptid = $("#ptid").val();
    var ptemail = $("#ptemail").val();
    var drname = $("#drname").val();
    var drid = $("#drid").val();
    console.log(ptid);
    console.log(ptemail);
    console.log(drname);
    $.ajax({
      type: "post",
      url: "/doctor/LabTest?_method=get",
      data: {
        patientid: ptid,
        patient: ptemail,
        doctorid: drid,
        dr: drname
      },
      success: function(res) {
        window.location = res.redirect;
      },
      error: function(err) {
        alert(" Something Wrong");
      }
    });
    return false;
  });
});

//To Create Lab test And Save to DataBase for Lab assistant
$(function() {
  $("#Test").submit(function() {
    var hospitalid = $("#hid").val();
    var labid = $("#labid").val();
    var ptname = $("#ptname").val();
    var ptid = $("#ptid").val();
    var drname = $("#drname").val();
    var drid = $("#drid").val();
    var test = $("#nameid").val();
    var detail = $("#detailid").val();

    $.ajax({
      type: "post",
      url: "/doctor/AddLabTest",
      data: {
        hid: hospitalid,
        patientid: ptid,
        doctorid: drid,
        labid: labid,
        doctorname: drname,
        patientname: ptname,
        test: test,
        details: detail
      },
      success: function(res) {
        alert("Saved");
        window.location = res.redirect;
      },
      error: function(err) {
        alert(" Something Wrong");
      }
    });
    return false;
  });
});
//For Lab Test Prescription
$(function() {
  $("#AddTestReport").submit(function() {
    var labid=$('labid').val();
    var ptid = $("#ptid").val();
    var ptemail = $("#ptname").val();
    var drname = $("#drname").val();
    var drid = $("#drid").val();
    console.log(ptid);
    console.log(ptemail);
    console.log(drname);
    $.ajax({
      type: "post",
      url: "/lab/LabTest?_method=get",
      data: {
        labid:labid,
        patientid: ptid,
        patientname: ptemail,
        doctorid: drid,
        doctorname: drname
      },
      success: function(res) {
        window.location = res.redirect;
      },
      error: function(err) {
        alert(" Something Wrong");
      }
    });
    return false;
  });
});
//To Create Lab test Report And Save to DataBase for Doctor
$(function() {
  $("#Test").submit(function() {
    var hospitalid = $("#hid").val();
    var labid = $("#labid").val();
    var ptname = $("#ptname").val();
    var ptid = $("#ptid").val();
    var drname = $("#drname").val();
    var drid = $("#drid").val();
    var test = $("#nameid").val();
    var detail = $("#detailid").val();
    var result = $('#resultid').val();

    $.ajax({
      type: "post",
      url: "/lab/AddLabTest",
      data: {
        hid: hospitalid,
        patientid: ptid,
        doctorid: drid,
        labid: labid,
        doctorname: drname,
        patientname: ptname,
        test: test,
        details: detail,
        result:result
      },
      success: function(res) {
        alert("Saved");
        window.location = res.redirect;
      },
      error: function(err) {
        alert(" Something Wrong");
      }
    });
    return false;
  });
});
