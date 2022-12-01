import classes from './MyPosts.module.css';
import Post from './Post/Post';
import React, { FC } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { createField, GetStringKeysType, Textarea } from '../../common/FormsControls/FormsControls';
import { PostType } from '../../../types/types';

type AddPostFormValuesType = {
    newPostText: string
}

export type MapStatePropsType = {
    posts: Array<PostType>
}

export type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

type MyPostsPropsType = MapStatePropsType & MapDispatchPropsType;

const MyPosts: FC<MyPostsPropsType> = React.memo( props => {
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
    // уже не используем походу
    // let newPostElement = React.createRef();

    let onAddPost = (values: AddPostFormValuesType) => {
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

// const maxLengt10 = maxLengthCreator(10);

type AddPostFormValuesTypeKeys = GetStringKeysType<AddPostFormValuesType>;

type AddNewPostFormPropsType = {}

let AddNewPostForm: FC<InjectedFormProps<AddPostFormValuesType & AddNewPostFormPropsType> & AddNewPostFormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<AddPostFormValuesTypeKeys>("Post message", "newPostText", [required], Textarea)}
                {/* <Field component={Textarea} placeholder={"Post message"} 
                name="newPostText" validate={[required, maxLengt10]} /> */}
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

let AddNewPostFormRedux = reduxForm<AddPostFormValuesType, AddNewPostFormPropsType>({
    form: "ProfileAddNewPostForm"
})(AddNewPostForm);

export default MyPosts;




