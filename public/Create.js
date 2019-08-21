//To Create Hospital
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
            url:'/superadmin/create',
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
