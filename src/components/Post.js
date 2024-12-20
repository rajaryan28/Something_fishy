import React, {useContext} from 'react'
import PostContext from '../Context/notes/PostContext';
import PostItem from './PostItem';

const Posts = () => {
    const context = useContext(PostContext);
    const {posts, setPosts} = context;
    return (
        <div className="row my-3">
            <h2>You Notes</h2> 
            {posts.map((post)=>{
                return <PostItem post={post}/>  
            })}
            </div>
    )
}
export default Posts