const express = require('express');
const router=express.Router();

const checkauth=require('../middleware/check-auth');
const Department = require('../controllers/department');

//To Get All departments
router.get('/list',checkauth,Department.GetDepartment);
//To Delete Department
router.delete('/deleteDepartment',checkauth,);
//To Add New Department
router.post('/addDepartment',checkauth,Department.createDepartment);
router.get('/addDepart',checkauth,(req,res)=>{
    res.render('adddepart')
});
//To Delete Department
router.delete('/:id',checkauth,Department.deleteDepart);

module.exports=router;