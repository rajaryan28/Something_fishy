const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../Models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
var fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "raj_of_priyadarshini"; // A JWT secret sign that added in authentication token to authenticate the user
let success = false;

//Route 1: Creating a user using : POST :/api/auth/createuser
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").notEmpty(),
    body("username", "Enter a valid useername(atleast 3 characters)").isLength({
      min: 3,
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a password (Minimun 5 characters)").isLength({
      min: 5,
    }),
    body("phone", "Enter a valid mobile number").isLength({ max: 10 }),
    body("gender", "Enter gender in words!").notEmpty(),
    body("sem", "Write you sem in words").notEmpty(),
    body("department", "").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({
            success,
            error: "Sorry a user with this email already exists",
          });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //Create a new user
      user = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: secPass,
        phone: req.body.phone,
        gender: req.body.gender,
        sem: req.body.sem,
        department: req.body.department,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      // res.json(user)
      res.json({ success, authtoken });
    } catch (error) {
      success = false;
      console.error(error.message);
      return res.status(500).send("Some Error occured");
    }
  }
);

//Route 2 : creating login end point : POST :/api/auth/login

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can not be empty)").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = await req.body;
    // check whether the user's email exits or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Login with correct credentials!" });
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Login with correct credentials!" });
      }

      const data = {
        id: user.id, //which data you wanna take to authenticate the user
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      success = false;
      console.error(error.message);
      res.status(500).send({ success }, "Some Internal error occured");
    }
  }
);

//Route 3 : Fetching logged user data using: POST :/api/auth/getUser

router.post("/getUser", fetchuser, async (req, res) => {
  // fetching user detail  usong auth Token
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    success = true;
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal error occured");
  }
});

//Route 4 : Forgot password procedure using: POST :/api/auth/forgotpassword
router.post("/forgotpassword", async (req, res) => {
  const { email } = await req.body;
  // check whether the user's email exits or not
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      success = false;
      return res
        .status(400)
        .json({ success, error: "Login with correct credentials!" });
    }
    const data = {
      id: user.id, //which data you wanna take to authenticate the user
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
   //  res.json({ success, authToken });


    //Nodemailer code

  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true, 
    auth: {
      user: "rajaryan2816@gmail.com",
      pass: "jbshwkicxjqlgwkk",
    },
  });

  const receiver={
   from: '"Raj Aryan" <msdhoni07.raj@gmail.com>',
      to: email,
      subject: "Password Reset Request",
      text: `Hey looks like you forgot your password for your PCE Anonymous account, click below to reset your password\n "http://localhost:3000/resetpassword/${authToken}"`, 
  }

  await transporter.sendMail(receiver)
  return res.status(200).send({message: "Reset Password Email sent successfully!"});

  } catch (error) {
    success = false;
    console.error(error.message);
    return res.status(500).send("Some Internal error occured");
  }

  
});


//Route 5 : Reset password  using: POST :/api/auth/resetpassword/:token
router.post("/resetpassword/:token", async (req, res) => {
  const { password } = await req.body;
  const token = req.params.token;
  try {
    const data = jwt.verify(token, JWT_SECRET);
    const userId = data.id;
    const salt = await bcrypt.genSalt(10);
    const resetPass = await bcrypt.hash(password, salt);
    //Create a new user
    user = await User.findByIdAndUpdate(userId, { password: resetPass });
    success = true;
    res.json({ success,message:"Password updated successfully!" });
  } catch (error) {
    success = false;
    console.error(error.message);
    return res.status(500).send("Some Error occured");
  }
});



module.exports = router;
