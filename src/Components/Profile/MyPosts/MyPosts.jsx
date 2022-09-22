import classes from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

const MyPosts = (props) => {

    let postsData = props.posts;

    let postsElements = postsData.map(post =>
        <Post message={post.message} likesCount={post.likesCount} />
    );

    let newPostElement = React.createRef();

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={classes.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost} />
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
}

let AddNewPostForm  = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component="textarea" name="newPostText" />
                {/* <textarea onChange={onPostChange} name="" ref={newPostElement} cols="30" rows="10" value={props.newPostText} /> */}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

let AddNewPostFormRedux = reduxForm({
    form: "ProfileAddNewPostForm"
})(AddNewPostForm);

export default MyPosts;