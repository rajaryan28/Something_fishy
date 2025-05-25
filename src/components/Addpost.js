import React, { useContext, useState } from "react";
import PostContext from "../Context/notes/PostContext";
import Footer from "./footer";
import PostPrompt from "./PromptAddpost";

const Addpost = () => {
  const Context = useContext(PostContext);
  const { addPost } = Context;

  const [post, setPost] = useState({ post: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(post.post);
    alert("Post submited succesfully.");
    setPost({ post: "" });
  };
  const onChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-3 ">
        <h2>Add Post:</h2>
        <div className="form-floating d-grid gap-2">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            name="post"
            onChange={onChange}
            value={post.post}
            style={{ height: "150px" }}
          ></textarea>
          <label htmlFor="floatingTextarea2">Post</label>
          <button
            className="btn btn-dark my-2 "
            disabled={post.post.length < 2}
            onClick={handleSubmit}
          >
            Add post
          </button>
        </div>
        <br />
      <PostPrompt />
      </div>
      <Footer />
      
    </>
  );
};

export default Addpost;
