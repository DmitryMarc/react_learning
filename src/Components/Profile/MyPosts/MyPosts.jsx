import classes from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const MyPosts = React.memo( props => {
    // componentDidMount(){
    //     setTimeout(() => {
    //         this.setState({a:12})
    //     }, 3000)
    // }

    // shouldComponentUpdate(nextProps, nextState){
    //     return nextProps != this.props || nextState != this.state;
    // }
    console.log("RENDER YO");

    let postsData = props.posts;
    let postsElements = postsData.map(post =>
        <Post key={post.id} message={post.message} likesCount={post.likesCount} />
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
    )
});

const maxLengt10 = maxLengthCreator(10)

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} placeholder={"Post message"} 
                name="newPostText" validate={[required, maxLengt10]} />
                {/* <textarea onChange={onPostChange} name="" ref={newPostElement} 
                cols="30" rows="10" value={props.newPostText} /> */}
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




