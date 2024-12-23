import React from 'react'

const Addpost = () => {
  return (
    <div className='container my-3 '>
      <h2>Add Post:</h2>
      <div className="form-floating">
  <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{"height": "100px"}}></textarea>
  <label for="floatingTextarea2">Post</label>
  <button className='btn btn-dark'>Add post</button>
</div>
    </div>
  )
}

export default Addpost
