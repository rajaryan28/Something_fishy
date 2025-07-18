import React, { useState, useEffect ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import PostContext from '../Context/notes/PostContext';
import Footer from "./footer";
import { Modal, Form } from "react-bootstrap";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const context = useContext(PostContext);
  const { Posts, getUserPosts, deletePost, User, getUser, updateUser } = context;
  const [formData, setFormData] = useState({
    name: User?.name || "",
    username: User?.username || "",
    phone: User?.phone || "",
    sem: User?.sem || "",
  });
  let navigate = useNavigate();

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (localStorage.getItem("authtoken")) {
        getUserPosts()
        getUser()
        }
        else{
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
    // eslint-disable-next-line
  }, []);

  const handleEditClick = () => {
    setFormData({
      name: User.name || "",
      username: User.username || "",
      phone: User.phone || "",
      sem: User.sem || "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateUser(formData);
    getUser(); // Refresh user info
    setShowModal(false);
  };

  return (
    <>
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
        <h3 className="fw-bold">{User.name}</h3>
        <p className="text-muted">@{User.username}</p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button className="btn btn-outline-dark" onClick={handleEditClick}>
            Edit profile <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="btn btn-outline-dark" onClick={() => navigate("/addpost")}>
            Add post <i className="fa-solid fa-plus"></i>
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
              <div className="card-body d-flex align-items-start">
                {/* <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: post.color || "skyblue",
                    marginRight: "15px",
                  }}
                ></div> */}
                <div className="flex-grow-1 ml-2">
                  {/* <h5 className="card-title fw-bold mb-1">{post.user.username}</h5> */}
                  <p
                    className="card-text mb-0"
                    style={{
                      margin: "0",
                      wordBreak: "break-word",
                    }}
                  >
                    {post.post} <span className="blockquote-footer"><small>❤{post.likes.length}</small></span>
                  </p>
                </div>
                
                <div className="d-flex align-items-center ml-auto">
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this post?")) {
                        deletePost(post._id);
                      }
                    }}
                    style={{
                      height: "35px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No posts available.</p>
        )}
      </div>
    </div>
    
    <Footer />

    {/* Edit Profile Modal */}
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSave}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="mobile"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sem</Form.Label>
            <Form.Control
              type="text"
              name="sem"
              value={formData.sem}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal} type="button">
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Save Changes
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
    </>
  );
  
};

export default Profile;
