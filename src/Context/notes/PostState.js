import { useState } from "react";
import PostContext from "./PostContext";

const PostState = (props) => {
  const host = "http://localhost:4000";
  const PostInitial = [];
  const [Posts, setPosts] = useState(PostInitial);
  const [User, setUser] = useState([]);

  // const PostInitial = [
  //   {
  //     "_id": "675d9c90388b552e6bb693e1",
  //     "user": {
  //       "_id": "675c69bf91be382db8001ea6",
  //       "username": "raj_aryan28"
  //     },
  //     "post": "Hey i am dash dash dash, I am all write.knbkjn i ijbhiizcjdsfjvdvdvv dvjshvscj jlnzjvncjznzcj  but we are having happiness regarding every thing so we thing we are doing great snd i should thank someonw with hammer in his one of the hand.",
  //     "date": "2024-12-14T14:56:16.728Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "675d9c90388b552e6bb693e1",
  //     "user": {
  //       "_id": "675c69bf91be382db8001ea6",
  //       "username": "raj_aryan28"
  //     },
  //     "post": "Hey i am dash dash dash, I am all write.",
  //     "date": "2024-12-14T14:56:16.728Z",
  //     "__v": 0
  //   },
  //   {
  //     "_id": "675d9c90388b552e6bb693e1",
  //     "user": {
  //       "_id": "675c69bf91be382db8001ea6",
  //       "username": "raj_aryan28"
  //     },
  //     "post": "Hey i am dash dash dash, I am all write.",
  //     "date": "2024-12-14T14:56:16.728Z",
  //     "__v": 0
  //   },
  // ];

  // const [post,setPost] = useState(PostInitial)

  //  // Add a Note
  //  const addPost = (postt)=>{
  //   // TODO: API Call
  //   console.log("Adding a new post")
  //   const posts = {
  //     "_id": "675d9c90388b552e6bb693e1",
  //     "user": {
  //       "_id": "675c69bf91be382db8001ea6",
  //       "username": "raj_aryan28"
  //     },
  //     "post": postt,
  //     "date": "2024-12-14T14:56:16.728Z",
  //     "__v": 0
  //   };
  //   setPost(post.concat(posts))
  // }

  //Fetching Posts
  const getallPosts = async () => {
    //Api call
    const response = await fetch(`${host}/api/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
    });
    const json = await response.json();
    setPosts(json);
  };

  //Add post

  const addPost = async (post) => {
    //Api call
    const response = await fetch(`${host}/api/posts/addpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
      body: JSON.stringify({ post }),
    });
    return response.json();
  };

  //Delete post

  const deletePost = async (id) => {
    //Api call
    const response = await fetch(`${host}/api/posts/deletepost/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
    });
    //  let c = confirm("Do you want to delete this post?")

    const json = await response.json();
    console.log(json);
    const newPosts = Posts.filter((post) => {
      return post._id !== id;
    });
    setPosts(newPosts);
  };

  //Edit Post

  const editPost = async (id, post) => {
    //Api call
    const response = await fetch(`${host}/api/posts/updatepost/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
      body: JSON.stringify({ post }),
    });
    const json = await response.json();
    console.log(json);

    let newPosts = JSON.parse(JSON.stringify(Posts));

    //Editing posts client-side
    for (let index = 0; index < newPosts.length; index++) {
      const element = newPosts[index];
      if (element._id === id) {
        newPosts[index].post = post;
        break;
      }
    }
    setPosts(newPosts);
  };

  //Fetching User sprecific Posts
  const getUserPosts = async () => {
    //Api call
    const response = await fetch(`${host}/api/posts/userpost`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
    });
    const json = await response.json();
    setPosts(json);
  };

  //Fetching  sprecific  User
  const getUser = async () => {
    //Api call
    const response = await fetch(`${host}/api/auth/getUser`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("authtoken"),
      },
    });
    const json = await response.json();
    setUser(json);
  };

  //Handling Likes
  const getCurrentUser = async () => {
    const token = localStorage.getItem("authtoken");
    if (!token) return null;

    const res = await fetch("http://localhost:4000/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });
    if (!res.ok) return null;
    return await res.json(); // should return { _id, name, username, ... }
  };

  // Update User Information
  const updateUser = async (userData) => {
    // userData is an object like { username, email, ... }
    const response = await fetch(`${host}/api/auth/updateuser`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
      body: JSON.stringify(userData),
    });
    const json = await response.json();
    // Optionally update local User state if needed:
    if (json.success) setUser(json.user);
    return json;
  };

  return (
    <PostContext.Provider
      value={{
        Posts,
        addPost,
        deletePost,
        editPost,
        getallPosts,
        getUserPosts,
        User,
        getUser,
        getCurrentUser,
        updateUser
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;


