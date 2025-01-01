import React, { useState, useEffect ,useContext} from "react";
import PostContext from '../Context/notes/PostContext';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const context = useContext(PostContext);
  const { Posts,getallPosts} = context;

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        getallPosts()
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Delete post
  // const deletePost = async (postId) => {
  //   try {
  //     const response = await fetch(`http://your-backend-api-endpoint/posts/${postId}`, {
  //       method: "DELETE",
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to delete post");
  //     }
  //     setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  //   } catch (error) {
  //     console.error("Error deleting post:", error);
  //   }
  // };

  return (
    <div
      className="container mt-4 mb-5"
      style={{
        paddingTop: "20px",
        paddingBottom: "20px",
      }}
    >
      {/* Profile Header */}
      <div className="text-center">
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: "purple",
            margin: "0 auto 10px",
          }}
        ></div>
        <h3 className="fw-bold">NAME</h3>
        <p className="text-muted">username_01</p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button className="btn btn-outline-dark">
            Edit profile ✏️
          </button>
          <button className="btn btn-outline-dark">
            Add post ➕
          </button>
        </div>
      </div>

      <hr />

      {/* Posts Section */}
      <h4 className="text-center my-4">Your Posts</h4>
      <div>
        {loading ? (
          <p className="text-center">Loading posts...</p>
        ) : Posts.length > 0 ? (
          Posts.map((post) => (
            <div
              key={post._id}
              className="card mb-3 mx-auto shadow-sm"
              style={{
                borderRadius: "15px",
                maxWidth: "600px",
                border: "none",
              }}
            >
              <div className="card-body d-flex flex-wrap align-items-center">
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: post.color || "skyblue",
                    marginRight: "15px",
                  }}
                ></div>
                <div className="flex-grow-1">
                  <h5 className="card-title fw-bold mb-1">{post.user.username}</h5>
                  <p
                    className="card-text"
                    style={{
                      margin: "0",
                      wordBreak: "break-word",
                    }}
                  >
                    {post.post}
                  </p>
                </div>
                <button
                  className="btn btn-outline-danger btn-sm"
                  // onClick={() => deletePost(post.id)}
                  style={{
                    height: "35px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  ❌
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
