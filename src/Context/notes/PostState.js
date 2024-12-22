import { useState } from "react";
import PostContext from "./PostContext";

const PostState = (props) => {
  // const host = "http://localhost:6000";
  // const PostInitial = [];
  // const [Posts, setPosts] = useState(PostInitial);




  const PostInitial = [
    {
      "_id": "675d9c90388b552e6bb693e1",
      "user": {
        "_id": "675c69bf91be382db8001ea6",
        "username": "raj_aryan28"
      },
      "post": "Hey i am dash dash dash, I am all write.knbkjn i ijbhiizcjdsfjvdvdvv dvjshvscj jlnzjvncjznzcj  but we are having happiness regarding every thing so we thing we are doing great snd i should thank someonw with hammer in his one of the hand ",
      "date": "2024-12-14T14:56:16.728Z",
      "__v": 0
    },
    {
      "_id": "675d9c90388b552e6bb693e1",
      "user": {
        "_id": "675c69bf91be382db8001ea6",
        "username": "raj_aryan28"
      },
      "post": "Hey i am dash dash dash, I am all write.",
      "date": "2024-12-14T14:56:16.728Z",
      "__v": 0
    },
    {
      "_id": "675d9c90388b552e6bb693e1",
      "user": {
        "_id": "675c69bf91be382db8001ea6",
        "username": "raj_aryan28"
      },
      "post": "Hey i am dash dash dash, I am all write.",
      "date": "2024-12-14T14:56:16.728Z",
      "__v": 0
    },
  ]
   
  const [post,setPost] = useState(PostInitial)









  // //Fetching Posts
  // const getallPosts = async () => {
  //   //Api call
  //   const response = await fetch(`${host}/api/posts/`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": localStorage.getItem("authtoken"),
  //     },
  //   });
  //   const json = await response.json();
  //   setPosts(json);
  // };

  // //Add post

  // const addPost = async (post) => {
  //   //Api call
  //   const response = await fetch(`${host}/api/posts/addpost`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": localStorage.getItem("authtoken"),
  //     },
  //     body: JSON.stringify({ post }),
  //   });
  //   return response.json();
  // };

  // //Delete post

  // const deletePost = async (id) => {
  //   //Api call
  //   const response = await fetch(`${host}/api/posts/deletepost/${id}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": localStorage.getItem("authtoken"),
  //     },
  //   });
  //   //  let c = confirm("Do you want to delete this post?")

  //   const json = await response.json();
  //   console.log(json);
  //   const newPosts = Posts.filter((post) => {
  //     return post._id !== id;
  //   });
  //   setPosts(newPosts);
  // };

  // //Edit Post

  // const editPost = async (id, post) => {
  //   //Api call
  //   const response = await fetch(`${host}/api/posts/updatepost/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "auth-token": localStorage.getItem("authtoken"),
  //     },
  //     body: JSON.stringify({ post }),
  //   });
  //   const json = await response.json();
  //   console.log(json);

  //   let newPosts = JSON.parse(JSON.stringify(Posts));

  //   //Editing posts client-side
  //   for (let index = 0; index < newPosts.length; index++) {
  //     const element = newPosts[index];
  //     if (element._id === id) {
  //       newPosts[index].post = post;
  //       break;
  //     }
  //   }
  //   setPosts(newPosts);
  // };

  return (
    <PostContext.Provider
      // value={{ Posts, addPost, deletePost, editPost, getallPosts }}
      value={{ post,setPost }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
