import { Dispatch } from 'react';
import { connect } from 'react-redux';
import { actions, ActionsTypes } from '../../../Redux/profile-reducer';
import { AppStateType } from '../../../Redux/redux-store';
import MyPosts from './MyPosts';

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(actions.addPostActionCreator(newPostText));
        }
    } 
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;


