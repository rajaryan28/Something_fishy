const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    post:{
        type:"string",
        required:true
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    date:{
        type:Date,
        default:Date.now
    }
    
  },{ timestamps: true });

module.exports=mongoose.model('post',PostSchema)