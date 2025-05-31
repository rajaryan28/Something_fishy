import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import PostContext from '../Context/notes/PostContext';
import PostItem from './PostItem';

const Posts = () => {
  let navigate = useNavigate();
  const context = useContext(PostContext);
  const { Posts, getallPosts,getCurrentUser } = context;
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      getCurrentUser().then(setUser);
      getallPosts()
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div className="row my-3">
      <h2><center>Posts</center></h2>
      {Posts.map((post) => {
        return <PostItem key={post._id} post={post} userId={user?._id} user={user} />
      })}
      <div className='mb-5'></div>

    </div>
  )
}
export default Posts