const User = require('../model/user')
const jwt = require('jsonwebtoken');
const bycrypt = require('bcrypt')
const {validationResult} = require('express-validator')


exports.signUp = (req,res,)=>{


    const {firstName,lastName,email,password} =req.body

    User.findOne({email:email}).then((data)=>{
        if(data){
            return res.status(404).json({
                'mess':"User already exists"
            })
        }
        else{
            bycrypt.hash(password,12).then(passwords=>{
                const user = new User(
                   { firstName,lastName,email,password:passwords,userName:Math.random().toString()}
                )
                user.save().then((response)=>{
                    if(response){
                        res.json({message:"Saved Successfully"})
                    }
                })
            })
        }
    })
}


exports.Login = (req,res)=>{
    const {email,password} = req.body;

   
        User.findOne({email:email}).then((savedData)=>{
            if(!savedData){
                return res.status(400).json({
                    error:'User does not exists'
                })
            }
            else{
                bycrypt.compare(password,savedData.password).then((correct)=>{
                    if(!correct){
                        return res.status(400).json({
                            error:"Incorrect Password"
                        })
                    }
                    else{
                        if(savedData.role === 'user'){
                            const token = jwt.sign({_id:savedData._id,role:savedData.role},"SUNILRAJ");
                        const {firstName,lastName,email,password,_id,role} = savedData;
                        res.status(200).json({
                            token:token,user:{
                                firstName,lastName,email,password,_id,role
                            }
                        })
                        }
                        else{
                            return res.status(400).json({
                                user :'User Authentication Required'
                            })
                        }
                    }
                })
            }
        })
    
}


exports.requireSignIn = (req,res,next)=>{
    if(req.headers.authorization){
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token,"SUNILRAJ");
    req.user = user;
    }
    else{
        return res.json({error:"Authorization required"})
    }
    next();
}


exports.validation = (req,res,next)=>{
    const error = validationResult(req)
    if(error.array().length > 0){
        return res.status(404).json({
            error:error.array()[0]
        })
    }

    next();
}