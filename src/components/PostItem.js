import React,{useContext,useState} from 'react';
import PostContext from '../Context/notes/PostContext';
import { Button } from 'react-bootstrap';

const PostItem = (props) => {
  const { post, user} = props;
  const context = useContext(PostContext);
  const { handleLike,likes} = context;
  
  const [isLiking, setIsLiking] = useState(false);
  
const handlingLike = (postId) => async () => {
  if (isLiking) return;
  
  setIsLiking(true);
  try {
    await handleLike(postId);
    console.log(handleLike.response);
      
    } catch (error) {
      console.error("Error liking post:", error);
    }
    setIsLiking(false);
  }
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
            
          <Button
            variant="outline-danger"
            onClick={handlingLike(post._id)}
            disabled={handleLike.isLiking}
            style={{ minWidth: '80px' }}
          >
            👍 {post.likes}
          </Button>
        
          </div>
        </div> 
      </div>

    </div>
  );
};

export default PostItem;
