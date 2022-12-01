import { Dispatch } from 'react';
import { connect } from 'react-redux';
import { actions, ActionsTypes } from '../../../Redux/profile-reducer';
import { AppStateType } from '../../../Redux/redux-store';
import MyPosts, { MapStatePropsType, MapDispatchPropsType } from './MyPosts';

const mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        posts: state.profilePage.postsData
    }
}

const mapDispatchToProps = (dispatch: Dispatch<ActionsTypes>):MapDispatchPropsType => {
    return {
        addPost: (newPostText: string) => {
            dispatch(actions.addPostActionCreator(newPostText));
        }
    }
}

const MyPostsContainer = connect<MapStatePropsType, MapDispatchPropsType, 
{}, AppStateType>(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;


