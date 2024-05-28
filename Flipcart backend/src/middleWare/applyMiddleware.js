exports.adminAuth = (req,res,next)=>{
    if(!req.user.role === 'admin'){
        return res.json({error:"admin authorization required"})
    }
    next();
}


exports.userAuth = (req,res,next)=>{
    if(!req.user.role === 'user'){
        return res.json({error:"User authorization required"})
    }
    next();
}