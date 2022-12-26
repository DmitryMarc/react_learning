import classes from './MyPosts.module.css';
import Post from './Post/Post';
import React, { FC } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { createField, GetStringKeysType, Textarea } from '../../common/FormsControls/FormsControls';
import { PostType } from '../../../types/types';
import { actions } from '../../../Redux/profile-reducer';
import { AppDispatchType, AppStateType } from '../../../Redux/redux-store';
import { useDispatch, useSelector } from 'react-redux';

type AddPostFormValuesType = {
    newPostText: string
}

const MyPosts: FC = React.memo( () => {
    console.log("RENDER YO");
    let postsData = useSelector((state: AppStateType) => state.profilePage.postsData);
    const dispatch: AppDispatchType = useDispatch();

    // shouldComponentUpdate(nextProps, nextState){
    //     return nextProps != this.props || nextState != this.state;
    // }

    let postsElements = postsData.map(post =>
        <Post key={post.id} message={post.message} likesCount={post.likesCount} />
    );
    // уже не используем походу
    // let newPostElement = React.createRef();

    let onAddPost = (values: AddPostFormValuesType) => {
        dispatch(actions.addPostActionCreator(values.newPostText));
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
                {/* name="newPostText" validate={[required, maxLengt10]} /> */}
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




