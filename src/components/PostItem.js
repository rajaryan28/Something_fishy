import React, { useState } from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const CARD_COLORS = [
  "#B9D7FF", // light blue
  "#ffe4e1", // misty rose
  "#e6e6fa", // lavender
  "#f0fff0", // honeydew
  "#fffacd", // lemon chiffon
  "#f5f5dc", // beige
  "#e0ffff", // light cyan
  "#f5f5f5", // white smoke
  "#f0f8ff", // alice blue
  "#fafad2"  // light goldenrod yellow
];

const CIRCLE_COLORS = [
  "#66CBDA", // steel blue
  "#ff7f7f", // light red
  "#9370db", // medium purple
  "#20b2aa", // light sea green
  "#ffd700", // gold
  "#deb887", // burlywood
  "#40e0d0", // turquoise
  "#a9a9a9", // dark gray
  "#6495ed", // cornflower blue
  "#ffd700"  // gold
];

//A simple hash function to convert a string to an index(it will always return the same index for the same string and different strings will return different indices)
function hashStringToIndex(str, arrayLength) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % arrayLength; // Maths.abs to ensure a positive index and  %arrayLength to wrap around the array
}

const PostItem = (props) => {
  const { post, userId, user } = props;
  const [likes, setLikes] = useState(post.likes || []);
  const [isLiking, setIsLiking] = useState(false);

  // Consistent color per post
  const colorIndex = hashStringToIndex(post._id, CARD_COLORS.length);
  const randomColor = CARD_COLORS[colorIndex];
  const circleColor = CIRCLE_COLORS[colorIndex];

  const isLiked = userId && likes.includes(userId);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      const res = await fetch(`http://localhost:4000/api/posts/like/${post._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('authtoken'),
        },
      });
      const data = await res.json();
      if (res.ok) {
        if (data.liked) {
          setLikes([...likes, userId]);
        } else {
          setLikes(likes.filter(id => id !== userId));
        }
      }
    } catch (err) {
      // Optionally handle error
    }
    setIsLiking(false);
  };

  return (
    <div>
      <div
        className="card mx-auto my-4 shadow-lg"
        style={{ borderRadius: "15px", backgroundColor: randomColor, overflow: "hidden" }}
        id="postCard"
      >
        <div className="card-body d-flex flex-sm-row align-items-center" style={{ position: "relative" }}>
          {/* Profile Circle */}
          <div
            className="circle me-3 flex-shrink-0"
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: circleColor,
              borderRadius: "50%",
            }}
          ></div>

          {/* Text Content */}
          <div style={{ position: "relative", flexGrow: "1" }}>
            <h5 className="card-title mb-1 fw-bold">{post.user.username}</h5>
            <p
              className="card-text text-muted mb-0"
              style={{ wordWrap: "break-word", whiteSpace: "normal" }}
            >
              {post.post}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "12px",
                minHeight: "32px"
              }}
            >
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>{isLiked ? "Unlike" : "Like"}</Tooltip>}
              >
                <span style={{ display: "inline-flex", alignItems: "center" }}>
                  <Button
                    variant="light"
                    className={`like-btn ${isLiked ? "liked" : ""} ms-2`}
                    onClick={handleLike}
                    disabled={isLiking}
                    style={{
                      borderRadius: "50%",
                      width: "28px",
                      height: "28px",
                      padding: 0,
                      fontSize: "1.1rem",
                      transition: "background 0.2s",
                      boxShadow: isLiked ? "0 0 8px #ff4d4f" : "none"
                    }}
                  >
                    <span className={`heart ${isLiked ? "pop" : ""}`}>
                      {isLiked ? <img width="30" height="30" src="https://img.icons8.com/fluency/48/love-circled.png" alt="love-circled"/> : "🤍"}
                    </span>
                  </Button>
                  <span
                    className="like-count"
                    style={{
                      fontSize: "1rem",
                      marginLeft: "8px",
                      minWidth: "18px",
                      color: "#ff4d4f",
                      fontWeight: 500
                    }}
                  >
                    {likes.length}
                  </span>
                </span>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
      <style>
        {`
          .heart.pop {
            animation: pop 0.3s;
          }
          @keyframes pop {
            0% { transform: scale(1); }
            50% { transform: scale(1.4); }
            100% { transform: scale(1); }
          }
          .like-btn.liked {
            background: #ffe6e6;
            color: #ff4d4f;
          }
        `}
      </style>
    </div>
  );
};

export default PostItem;
