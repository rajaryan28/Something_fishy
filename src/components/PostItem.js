import React from 'react'

const PostItem = () => {
  return (
    <div>
    const { post } = props;
    return (
        <div className="col-md-3"> 
            <div class="card my-3"> 
                <div class ="card-body">
                <h3 class ="card-title">{post.user.username}</h3>
                <p class ="card-text">{post.post}</p> 
                </div>
            </div>
        </div>
    )
    </div>
  )
}

export default PostItem
