const express= require('express');
const {body,validationResult} = require('express-validator')
const Post = require('../Models/Post');
const User=require('../Models/User')
const fetchuser = require('../middleware/fetchuser');
const router= express.Router()

// Route 1 : Fetching all the notes of the specific user : Get "/api/posts/". Login required

router.get("/",fetchuser,async (req, res) => {
    try {
        const posts = await Post.find().populate('user','username').exec()
        res.json(posts)

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Internal error occured");
    }
  });




// Route 2 : Adding a new  notes of the specific user : Post "/api/posts/addpost". Login required

router.post(
    "/addpost",fetchuser,
    [
      body("post", "Enter post").isLength({ min: 3 }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { post } = req.body;
  
      // adding a new note
      try {
        const posts = new Post({
          post,
          user: req.user.id,
          username: req.user.username
        });
        const savesPost = await posts.save();
        res.json(savesPost);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Internal error occured");
      }
    }
  );
  



module.exports=router