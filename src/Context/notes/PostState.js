import { useState } from "react";
import PostContext from "./PostContext";

const PostState = (props) => {
  const host = "http://localhost:6000";
  const PostInitial = [];
  const [Posts, setPosts] = useState(PostInitial);

  //Fetching Posts
  const getallPosts = async () => {
    //Api call
    const response = await fetch(`${host}/api/posts/`, {
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

  const addPost = async (title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/posts/addpost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
      body: JSON.stringify({ title, description, tag }),
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

  const editPost = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/posts/updatepost/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("authtoken"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);

    let newPosts = JSON.parse(JSON.stringify(Posts));

    //Editing posts client-side
    for (let index = 0; index < newPosts.length; index++) {
      const element = newPosts[index];
      if (element._id === id) {
        newPosts[index].title = title;
        newPosts[index].description = description;
        newPosts[index].tag = tag;
        break;
      }
    }
    setPosts(newPosts);
  };

  return (
    <PostContext.Provider
      value={{ Posts, addPost, deletePost, editPost, getallPosts }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostState;
