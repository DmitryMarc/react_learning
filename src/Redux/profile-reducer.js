import { profileAPI, usersAPI } from "../api/api";
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    postsData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 15 },
        { id: 2, message: 'It\'s my first post', likesCount: 20 },
        { id: 3, message: 'It\'s my second post', likesCount: 21 },
        { id: 4, message: 'It\'s my coolest post', likesCount: 4 }
    ],
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            };
        }
        case DELETE_POST: {
            return {
                ...state,
                postsData: state.postsData.filter(post => post.id != action.postId)
            }
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText });

export const setUserProfileActionCreator = (profile) => ({ type: SET_USER_PROFILE, profile });

export const setStatusActionCreator = (status) => ({ type: SET_STATUS, status });

export const deletePostActionCreator = (postId) => ({ type: DELETE_POST, postId });

export const getUserProfileThunkCreator = (userId) => (dispatch) => (
    usersAPI.getProfile(userId).then(response => {
        dispatch(setUserProfileActionCreator(response.data));
    })
);

export const getStatusThunkCreator = (userId) => (dispatch) => (
    profileAPI.getStatus(userId).then(response => {
        dispatch(setStatusActionCreator(response.data));
    })
);

export const updateStatusThunkCreator = (status) => (dispatch) => (
    profileAPI.updateStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(setStatusActionCreator(status));
        }
    })
);

export default profileReducer;