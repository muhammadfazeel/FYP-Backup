const Department = require('../Models/department');



//To Create Department
exports.createDepartment=(req,res,next)=>{
                            const depart=new Department ({
                                hid:req.userData.hospitalid,
                               name:req.body.name,
                               description:req.body.description
                            });
                            depart.save()
                            .then(result=>{
                                console.log(result)
                            })
                            .catch(err=>{
                                console.log(err);
                            })
                            
                    }
                    
            
// To Get All Departments
exports.GetDepartment= async (req,res,next)=>{
    let result =await Department.find({hid:req.userData.hospitalid})
     return  res.render('department',{
         posts:result
     })
}

//To Delete Depart
exports.deleteDepart=async (req,res,next)=>{
    let Hospital
    let User
  try {
    Hospital = await Department.findById(req.params.id)
    await Hospital.remove()
    
    res.redirect('/department/list')
  } catch {
    
      res.redirect('/department/list')
  }

}