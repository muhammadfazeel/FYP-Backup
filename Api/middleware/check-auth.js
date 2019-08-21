const jwt=require('jsonwebtoken');
const storage = require('node-sessionstorage');
module.exports =(req,res,next)=>{
try
   {
    //console.log('item set:', storage.getItem('data'));
    const token=storage.getItem('data');
    const decoded=jwt.verify(token,'secret');
     req.userData=decoded;
    next();
   } 
catch(error)
{
    res.render('login');
//     return res.status(401).json({
//     message:"Auth Failed"
// });
}
}