import React, {useContext,useEffect} from 'react'
import PostContext from '../Context/notes/PostContext';
import PostItem from './PostItem';

const Posts = () => {
    const context = useContext(PostContext);
    const {Posts, getallPosts} = context;
    useEffect(() => {
        getallPosts()
        // eslint-disable-next-line
    }, [])
    return (
        <div className="row my-3">
            <h2><center>Posts</center></h2> 
            {Posts.map((post)=>{
                return <PostItem key={post._id} post={post} user={post.user}/>  
            })}
            <div className='mb-5'></div>
            
            </div>
    )
}
export default Posts