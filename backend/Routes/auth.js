const express= require('express')
const {body,validationResult} = require('express-validator')
const User=require('../Models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
var fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'raj_of_priyadarshini' // A JWT secret sign that added in authentication token to authenticate the user
let success = false;


//Route 1: Creating a user using : POST :/api/auth/createuser
router.post('/createuser',[
   body('name','Enter a valid name').notEmpty(),
   body('username','Enter a valid useername(atleast 3 characters)').isLength({min:3}),
   body('email','Enter a valid email').isEmail(),
   body('password','Enter a password (Minimun 5 characters)').isLength({min:5}),
   body('phone','Enter a valid mobile number').isLength({max:10}),
   body('gender','Enter gender in words!').notEmpty(),
   body('sem','Write you sem in words').notEmpty(),
   body('department','').notEmpty(),
],async(req,res)=>{
   const errors = validationResult(req);
    if(!errors.isEmpty()){
      success=false
        return res.status(400).json({success,errors:errors.array()});
        
    }
  try{
   let user = await User.findOne({email:req.body.email})
   if(user){
      success=false
      return res.status(400).json({ success,error: "Sorry a user with this email already exists"})
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
      success=true
      // res.json(user)
      res.json({success,authtoken})
      
   }catch (error){
      success=false
      console.error(error.message);
    res.status(500).send({success},"Some Error occured");
   }
      
   
})




//Route 2 : creating login end point : POST :/api/auth/login

router.post("/login",[
   body('email','Enter a valid email').isEmail(),
   body('password','Password can not be empty)').exists(),
  
],async (req,res)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
       success=false
       return res.status(400).json({success,errors:errors.array()});
   }
   
   const {email,password}= await req.body;
   // check whether the user's email exits or not 
   try{
       let user = await User.findOne({email:req.body.email})
       if(!user){
         success=false
           return res.status(400).json({success,error:"Login with correct credentials!"})
       }

       const comparePassword = await bcrypt.compare(password , user.password)

       if (!comparePassword){
         success=false
           return res.status(400).json({success,error:"Login with correct credentials!"})
       }


       const data=({
           id:user.id  //which data you wanna take to authenticate the user
       })
       const authToken= jwt.sign(data,JWT_SECRET)
       success=true
       res.json({success,authToken})


}
   catch (error){
      success=false
       console.error(error.message)
       res.status(500).send({success},"Some Internal error occured")
   }
})


//Route 3 : Fetching logged user data using: POST :/api/auth/getUser

router.post("/getUser",fetchuser,async (req,res)=>{
    
   // fetching user detail  usong auth Token
   try{
       userId=  req.user.id
       const user = await User.findById(userId).select("-password")
       success=true
       res.send(user)
   }
   catch (error){
       console.error(error.message)
       res.status(500).send("Some Internal error occured")
   }

})


module.exports=router