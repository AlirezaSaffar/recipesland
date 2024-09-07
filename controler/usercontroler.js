const user = require('../models/user')
const express = require("express")
const recipeRouter = express.Router()
var addfood = require('../models/recipe')
const { ObjectId } = require('mongodb')
const joi = require("joi")
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
class userscontroler{
    static signup = async(req,res)=>{
        var i;
        var us = await user.find();
       const schema ={
        username : joi.string().min(4).max(50).required(),
        password :joi.string().min(4).max(50).required()
}
          var hashpassword = await bycrypt.hash(req.body.password,10)
          var check=true;
          var isvalid= joi.object(schema).validate(req.body)
          for(i in us){
              if(us[i]["username"]==req.body.username){check = false;}
          }
          if(check){
           if(isvalid.error) return
            var newuserdata= {
              username:req.body.username,
              password:hashpassword
            }
          const newuser = new user(newuserdata);
        try{
         await newuser.save();
      }catch{
          console.log("err")
        } 
           }
}

    static login = async(req,res)=>{
        var i;
        var us = await user.find();
        var check = false;
        for(i in us){
            if(us[i]["username"]==req.body.username){
              check = bycrypt.compareSync(req.body.password,us[i]["password"]);}
        }
        if(check){
         var token= jwt.sign(req.body.username,"mysecretkey58963");
         }else{
         var token = false;
        }
         res.json(token).send();
}

    static addfav = async(req,res)=>{
      var i;
      try{
    var n=   jwt.verify(req.body.name,"mysecretkey58963")
    }catch(err){
      console.log(err)
    }
      var us = await user.find();
      var t;
      for(i in us){
        if(us[i]["username"]==n){
t = us[i]["favorites"];
break;
        }
      }
var favrecipes = t.split('-');
for(i in favrecipes){
  if(favrecipes[i]==req.body.food) return
}
t= t+"-"+req.body.food;
await user.updateOne({ username:n},{ $set: {favorites: t} } );
}

    static rate =async(req,res)=>{

      var nr= req.body.rate;
      var food= req.body.food;
      var fs;
      var i;
      fs= await addfood.find();
      for(i in fs ){
        if(fs[i]["title"]==food){
          var nrate=fs[i]["numberOfRate"];
          var oldrate = fs[i]["rate"];
          break;
        }
      }
      
var sum = nrate*oldrate + nr;
nrate++;
var newr= sum/nrate;
await addfood.updateOne({ title:food},{ $set: {numberOfRate: nrate , rate: newr  } } );
}

    static showfav= async(req,res)=>{
      var us = await user.find();
      var i;
      for(i in us){
        if(us[i]["username"]==jwt.verify(req.body.name,"mysecretkey58963")){
          var txt = us[i]["favorites"];
          break;
        }     }
        res.json(txt).send();
    }
}

module.exports = userscontroler
