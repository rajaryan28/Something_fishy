import React from "react";

const PostItem = (props) => {
  return (
    <div>
      <div
        class="card mx-auto my-4 shadow-lg"
        style={{ "border-radius": "15px", "backgroundColor": "add8e6","overflow":"hidden"}}
        id="postCard"
      >
        <div class="card-body d-flex flex-sm-row align-items-center">
           {/* Profile Circle   */}
          <div
            class="circle me-3 flex-shrink-0"
            style={{
              width: "60px",
              height: "60px",
              "background-color": "#5bc0de",
              "border-radius": "50%",
            }}
          ></div>

          {/* /* Text Content   */}
          <div style={{"flex-grow": "1"}}>
            <h5 class="card-title mb-1 fw-bold">{props.post.user.username}</h5>
            <p class="card-text text-muted mb-0" style={{"word-wrap": "break-word", "white-space": "normal"}}>{props.post.post}</p>
          </div>
        </div> 
      </div>



      {/* bootstrap postCard */}


      {/* <div class="card mb-3" style={{"max-width": "540px"}}>
  <div class="row g-0">
    <div class="col-md-4">
      <img src="..." class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{props.post.user.username}</h5>
        <p class="card-text">{props.post.post}</p>
      </div>
    </div>
  </div>
</div> */}


{/* <div class="card mx-auto my-4 shadow-lg" style={{"max-width": "600px", "border-radius": "15px", backgroundColor: "add8e6"}}>
  <div class="card-body d-flex align-items-center">
    <div class="circle me-3" style={{"width": "60px"," height": "60px"," background-color":" #5bc0de"," border-radius":" 50%"}}></div>
    
    <div>
      <h5 class="card-title mb-1 fw-bold">username_01</h5>
      <p class="card-text text-muted mb-0">What’s in your mind!!</p>
    </div>
  </div>
</div> */}



      
    </div>
  );
};

export default PostItem;
