const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    name:{
        type:"string",
        required:true,
    },
    username:{
        type:"string",
        required:true,
        unique:true,
    },
    email:{
        type:"string",
        required:true,
        unique:true,
    },
    password:{
        type:"string",
        required:true
    },
    phone:{
        type:"number",
        required:true,
    },
    gender:{
        type:"string",
        required:true,
    },
    sem:{
        type:"string",
        required:true,
    },
    department:{
        type:"string",
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
  });

module.exports=mongoose.model('user',UserSchema)