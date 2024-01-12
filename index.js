require('dotenv').config();
const express = require('express');

const port = 8001;

const app = express();

const db = require('./config/mongoose');

const Register = require('./models/Register');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const auth = require('./config/auth');

app.use(express.urlencoded())

app.post("/register",async (req,res)=>{
    try{
        let user = await Register.findOne({email:req.body.email});
        if(!user){
            if(req.body.password== req.body.confirm_password){
                req.body.password = await bcrypt.hash(req.body.password,10)
                let userData = await Register.create(req.body);
                if(userData){
                    return res.status(200).json({msg:"Register Successfully & Goto Login",status:1});
                }
                else{
                    return res.status(200).json({msg:"Something wrong",status:0});
                }
            }
            else{
                return res.status(200).json({msg:"password and confirm password not match",status:0});
            }
        }  
        else{
            return res.status(200).json({msg:"user Already registered",status:0});
        }
    }
    catch(err){
        return res.status(400).json({msg:"Something wrong from server",status:0});
    }
})

app.post("/login", async (req,res)=>{
    try{
        let user = await Register.findOne({email:req.body.email});
        if(user){
            if(await bcrypt.compare(req.body.password, user.password)){
                let token = await jwt.sign({user : user},process.env.SECRET_KEY,{expiresIn : '1h'});
                return res.status(200).json({msg:"Login Successfully",status:1,token : token});
            }
            else{
                return res.status(400).json({msg:"Invalid Password",status:0});
            }
        }
        else{
            return res.status(400).json({msg:"Invalid email",status:0});
        }
    }
    catch(err){
        return res.status(400).json({msg:"Something wrong from server",status:0});
    }
})

app.get('/profile',auth.checkAuth,async (req,res)=>{
    try{
        if(req.user){
            return res.status(200).json({msg:"Profile is here",status:1,user: req.user});
        }
        else{
            return res.status(400).json({msg:"unauthorized user",status:0});
        }
    }
    catch(err){
        return res.status(400).json({msg:"Something wrong from server",status:0});
    }
})

app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("run:",port);
})