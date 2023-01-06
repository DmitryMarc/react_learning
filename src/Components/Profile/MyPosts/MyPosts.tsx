import styles from './MyPosts.module.css';
import Post from './Post/Post';
import React, { FC, useEffect, useState } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { required } from '../../../utils/validators/validators';
import { createField, GetStringKeysType, Textarea } from '../../common/FormsControls/FormsControls';
import { PostType } from '../../../types/types';
import { actions } from '../../../Redux/profile-reducer';
import { AppDispatchType } from '../../../Redux/redux-store';
import { useDispatch, useSelector } from 'react-redux';
import { selectPostsData, selectProfilePhoto } from '../../../Redux/selectors/profile-selectors';
import { Button } from 'antd';

type AddPostFormValuesType = {
    newPostText: string,
}

const MyPosts: FC = React.memo(() => {
    const [actualUserPhoto, setActualUserPhoto] = useState<string | null | undefined>(null);
    const userPhoto = useSelector(selectProfilePhoto)
    const postsData = useSelector(selectPostsData);
    const dispatch: AppDispatchType = useDispatch();

    useEffect(() => {
        setActualUserPhoto(userPhoto);
    }, [userPhoto])

    let postsElements = postsData.map(post =>
        <Post key={post.id} userPhoto={actualUserPhoto}
            message={post.message} likesCount={post.likesCount} />
    );

    let onAddPost = (values: AddPostFormValuesType) => {
        dispatch(actions.addPostActionCreator(values.newPostText));
    }

    return (
        <div className={styles.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost} />
            <div className={styles.posts}>
                {postsElements}
            </div>
        </div>
    )
});

type AddPostFormValuesTypeKeys = GetStringKeysType<AddPostFormValuesType>;

type AddNewPostFormPropsType = {
}

let AddNewPostForm: FC<InjectedFormProps<AddPostFormValuesType &
    AddNewPostFormPropsType> & AddNewPostFormPropsType> = (props) => {
        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    {createField<AddPostFormValuesTypeKeys>("Post message", "newPostText", [required], Textarea)}
                    {/* name="newPostText" validate={[required, maxLengt10]} /> */}
                </div>
                <div>
                    {/* <button>Add post</button> */}
                    <Button htmlType="submit"
                        style={{ float: "right" }}>Save</Button>
                </div>
            </form>
        )
    }

let AddNewPostFormRedux = reduxForm<AddPostFormValuesType, AddNewPostFormPropsType>({
    form: "ProfileAddNewPostForm"
})(AddNewPostForm);

export default MyPosts;
