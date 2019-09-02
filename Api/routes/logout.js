const storage = require('node-sessionstorage');
const express = require('express');
const router=express.Router();

const checkauth=require('../middleware/check-auth');
//To Logout
router.get('/logout',checkauth,(req,res)=>{
    token = "Abcdefghijklmnopqrstuvwxyz"
    storage.setItem('data',token);
    res.redirect('/login')
})

module.exports=router;