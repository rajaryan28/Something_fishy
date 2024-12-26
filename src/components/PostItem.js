import React from "react";

const PostItem = (props) => {
  const { post, user} = props;
  return (
    <div>
      <div
        className="card mx-auto my-4 shadow-lg"
        style={{ borderRadius: "15px", backgroundColor: "#add8e6","overflow":"hidden"}}
        id="postCard"
      >
        <div className="card-body d-flex flex-sm-row align-items-center">
           {/* Profile Circle   */}
          <div
            className="circle me-3 flex-shrink-0"
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "#5bc0de",
              borderRadius: "50%",
            }}
          ></div>

          {/* /* Text Content   */}
          <div style={{flexGrow: "1"}}>
            <h5 className="card-title mb-1 fw-bold">{user.username}</h5>
            <p className="card-text text-muted mb-0" style={{wordWrap: "break-word", whiteSpace: "normal"}}>{post.post}</p>
          </div>
        </div> 
      </div>

    </div>
  );
};

export default PostItem;
