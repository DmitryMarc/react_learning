import classes from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../Redux/state';


const MyPosts = (props) => {

    let postsData = props.posts;

    let postsElements = postsData.map(post => 
        <Post message={post.message} likesCount={post.likesCount} />
    );

    let newPostElement = React.createRef();
    
    let addPost = () => {
        props.dispatch(addPostActionCreator());
    }

    let onPostChande = () => {
        let text = newPostElement.current.value;
        // let action = {type: 'UPDATE-NEW-POST-TEXT', newText: text};
        let action = updateNewPostTextActionCreator(text);
        props.dispatch(action);
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChande} name="" ref={newPostElement} cols="30" rows="10" value={props.newPostText} />
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