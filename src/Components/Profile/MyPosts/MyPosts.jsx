import classes from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';

const MyPosts = (props) => {

    let postsData = props.posts;

    let postsElements = postsData.map(post => 
        <Post message={post.message} likesCount={post.likesCount} />
    );

    let newPostElement = React.createRef();
    
    let addPost = () => {
        let text = newPostElement.current.value;
        alert(text);
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea name="" ref={newPostElement} cols="30" rows="10"></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
}

export default MyPosts;