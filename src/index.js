const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collection = require('./connection');
const { name } = require('ejs');

const app = express(); 
app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs');

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("login");
})

app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.post("/signup",async(req,res)=>{
    const data = {
        name: req.body.username,
        password: req.body.password
    }

    const existUser = await collection.findOne({name: data.username});
    if(existUser){
        res.send("Regestered already with this please use another name");
    }else{
        const saltRounds = 8;
        const hashPassword = await bcrypt.hash(data.password,saltRounds);
        data.password = hashPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
    }
});

app.post("/login",async(req,res)=>{
    try{

        const {username, password} = req.body
        console.log(username);
        console.log(password);
        const check = await collection.findOne({name: req.body.username});
        if(!check){
          return  res.json("user name can not found");
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if(isPasswordMatch){
            return res.render("home");
        }
        else{
            return req.json("Wrong Password");
        }
    }
    catch{
       return res.json("Wrong Details");
    }
})

const port = 3000;
app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("server is listening port.")
    }
})