const express= require('express')
const {body,validationResult} = require('express-validator')
const User=require('../Models/User')
const router = express.Router()

const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

const JWT_SECRET = 'raj_of_priyadarshini'


//Route 1: Creating a user using : POST :/api/auth/createuser
router.post('/createuser',[
   body('name','Enter a valid name').notEmpty(),
   body('username','Enter a valid useername(atleast 3 characters)').isLength({min:3}),
   body('email','Enter a valid email').isEmail(),
   body('password','Enter a password (Minimun 5 characters)').isLength({min:5}),
   body('phone','Enter a valid mobile number').isLength({max:10}),
   body('gender','').notEmpty(),
   body('sem','Write you sem in words').notEmpty(),
   body('department','').notEmpty(),
],async(req,res)=>{
   const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
        
    }
  try{
   let user = await User.findOne({email:req.body.email})
   if(user){
      return res.status(400).json({ error: "Sorry a user with this email already exists"})
   }
  const salt = await bcrypt.genSalt(10)
  const secPass = await bcrypt.hash(req.body.password,salt)
   //Create a new user 
   user = await User.create({
          name:req.body.name,
          username:req.body.username,
          email:req.body.email,
          password:secPass,
          phone:req.body.phone,
          gender:req.body.gender,
          sem:req.body.sem,
          department:req.body.department
      })
      const data ={
         user:{
            id:user.id
         }
      }
      const authtoken = jwt.sign(data,JWT_SECRET)
      // res.json(user)
      res.json({authtoken})
      
   }catch (error){
      console.error(error.message);
    res.status(500).send("Some Error occured");
   }
      
   
})

module.exports=router


//Route 2 : creating login end point : POST :/api/auth/login

router.post("/login",[
   body('email','Enter a valid email').isEmail(),
   body('password','Password can not be empty)').exists(),
  
],async (req,res)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
       
       return res.status(400).json({errors:errors.array()});
   }
   
   const {email,password}= await req.body;
   // check whether the user's email exits or not 
   try{
       let user = await User.findOne({email:req.body.email})
       if(!user){
           return res.status(400).json({error:"Login with correct credentials!"})
       }

       const comparePassword = await bcrypt.compare(password , user.password)

       if (!comparePassword){
           return res.status(400).json({error:"Login with correct credentials!"})
       }


       const data=({
           id:user.id  //which data you wanna take to authenticate the user
       })
       const authToken= jwt.sign(data,JWT_SECRET)
       res.json({authToken})


}
   catch (error){
       console.error(error.message)
       res.status(500).send("Some Internal error occured")
   }
})
