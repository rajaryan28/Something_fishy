const express= require('express');
const {body,validationResult} = require('express-validator')
const Post = require('../Models/Post');
const User=require('../Models/User')
const fetchuser = require('../middleware/fetchuser');
const router= express.Router()

// Route 1 : Fetching all the posts  : Get "/api/posts/". Login required

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
  

  

// Route 3 : Update an existing  post of the specific user : Patch "/api/posts/updatepost". Login required

router.patch("/updatepost/:id", fetchuser, async (req, res) => {
  const post  = req.body.post;

  // updating the post
  try {
    const newPost = {}; //new note that has to be updated
    if (post) {
      newPost.post = post;
    }
    

    //finding the note that should be updated

    let posts = await Post.findById(req.params.id);
    if (!posts) {
      return res.status(404).send("Not found!");
    }

    if (posts.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed!");
    }

    posts = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: newPost },
      { new: true }
    );
    res.json({ posts });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal error occured");
  }
});


// Route 4 : Delete an existing  notes of the specific user : Delete "/api/notes/deletepost/:id". Login required

router.delete("/deletepost/:id", fetchuser, async (req, res) => {
  try {
    //finding the note that should be deleted

    let posts = await Post.findById(req.params.id);
    if (!posts) {
      return res.status(404).send("Not found!");
    }

    if (posts.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed!");
    }

    posts = await Post.findByIdAndDelete(req.params.id);
    res.json({ success: "The note is succesfully deleted!", post:posts });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal error occured");
  }
});



// Route 5 : Fetching all the posts  : Get "/api/posts/". Login required

router.get("/userpost",fetchuser,async (req, res) => {
  try {
    const notes = await Post.find({ user: req.user.id });
    res.json(notes);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some Internal error occured");
  }
});


//Route 6: Fetching the likes of post
// Like or Unlike a post
router.post('/like/:id', fetchuser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");

    const userId = req.user.id;
    const index = post.likes.indexOf(userId);

    if (index === -1) {
      post.likes.push(userId); // Like
    } else {
      post.likes.splice(index, 1); // Unlike
    }

    await post.save();
    res.json({ likes: post.likes.length, liked: index === -1 });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports=router