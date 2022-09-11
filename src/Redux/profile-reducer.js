import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    postsData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 15 },
        { id: 2, message: 'It\'s my first post', likesCount: 20 },
        { id: 2, message: 'It\'s my second post', likesCount: 21 },
        { id: 2, message: 'It\'s my coolest post', likesCount: 4 }
    ],
    newPostText: 'Dmitry.com',
    profile: null,
    status: ""
}

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
                newPostText: ''
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
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
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({ type: ADD_POST });
export const updateNewPostTextActionCreator = (text) =>
    ({ type: UPDATE_NEW_POST_TEXT, newText: text });
export const setUserProfileActionCreator = (profile) => ({ type: SET_USER_PROFILE, profile });

export const setStatusActionCreator = (status) => ({ type: SET_STATUS, status });

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