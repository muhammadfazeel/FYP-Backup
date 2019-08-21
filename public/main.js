//for signup
$(document).ready(function(){
    $('#create').submit(function(){
        var mytitle = $('#titleid').val();
        var myemail = $('#emailid').val();
        var mypassword=$('#passwordid').val();
        var myaddress = $('#addressid').val();
        var myphone = $('#phoneid').val();
        $.ajax({
            global: false,
            type: "post",
            url:'/create-hospital/create',
            dataType: "json",
            data:{
                title:mytitle,
                email:myemail,
                password:mypassword,
                address:myaddress,
                phone:myphone
                
            },
            
            success:function(res){
                alert("Account created successfuly ");
                if ( res.status === 'success'){
                    window.location = res.redirect
                } 
            },
            error:function(err){
                alert("Email Already Exist");
            }
        });
        return false;
    })
})



//for login and jwt token

$(document).ready(function(){
    $('#form').submit(function(){
        var myemail = $('#emailid').val();
        var mypassword=$('#passwordid').val();
        $.ajax({
            global: false,
            type: "post",
            url:'/user/login',
         data:{
                email:myemail,
                password:mypassword
            },
            
            success:function(res){
                alert("success");
               
               
                window.location = res.redirect
                
            } 
            ,error:function(err){
                alert("error");
            }
        });
        return false;
    })
    
})

//To Create Doctor
$(document).ready(function(){
    $('#Doctor').submit(function(){
        var mytitle = $('#nameid').val();
        var myemail = $('#emailid').val();
        var mypassword=$('#passwordid').val();
        var myaddress = $('#addressid').val();
        var myspec = $('#departmentid').val();
        var myphone = $('#phoneid').val();
        $.ajax({
            global: false,
            type: "post",
            url:'/doctor/signup',
            dataType: "json",
            data:{
                name:mytitle,
                email:myemail,
                password:mypassword,
                address:myaddress,
                department:myspec,
                phone:myphone
                
            },
            
            success:function(res){
                alert("Doctor created successfuly ");
                if ( res.status === 'success'){
                    window.location = res.redirect
                } 
            },
            error:function(err){
                alert("Email Already Exist");
            }
        });
        return false;
    })
})







