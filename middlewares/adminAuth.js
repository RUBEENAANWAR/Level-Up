const jwt = require("jsonwebtoken");


const adminAuth = (req, res, next) => {
    try {
        const token=req.header("Authorization")
        // console.log(token,"header");
        if(!token) return res.status(400).json({msg:"Invalid Authentication"})
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,admin)=>{
            if(err) return res.status(400).json({msg:"Invalid Authentication"})
            req.admin=admin
            // console.log(req.admin,"req.admin");
            next()
        })
    } catch (err) {
        return res.status(500).json({msg:err.message})
        
    }
};

module.exports = adminAuth;