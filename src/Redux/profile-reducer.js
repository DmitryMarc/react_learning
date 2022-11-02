import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

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
                postsData: state.postsData.filter(post => post.id !== action.postId)
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }
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

export const savePhotoSuccessActionCreator = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos });

export const getUserProfileThunkCreator = (userId) => async (dispatch) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfileActionCreator(response.data));
};

export const getStatusThunkCreator = (userId) => async (dispatch) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatusActionCreator(response.data));
};

export const updateStatusThunkCreator = (status) => async (dispatch) => {
    try { // пробуем это выпонять
        const response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatusActionCreator(status));
        }
    } catch (error) { //но если поймали ошибку, то выполнить ....
        // Something
    }
};

export const savePhotoThunkCreator = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccessActionCreator(response.data.data.photos));
    }
};

export const saveProfileThunkCreator = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfileThunkCreator(userId));
    } else {
        dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
        // dispatch(stopSubmit("edit-profile", { "contacts": {"facebook": response.data.messages[0]} }));
        // необходимо распарсить ошибку для каждого случая (выглядеть должно примерно так, но у нас hardcode)
        return Promise.reject(response.data.messages[0]);
    }
}

export default profileReducer;