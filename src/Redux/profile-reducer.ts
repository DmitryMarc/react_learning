import { profileAPI } from './../api/profile-api';
import { PostType, ProfileType, PhotosType } from './../types/types';
import { FormAction, stopSubmit } from "redux-form";
import { ResultCodesEnum } from "../api/api";
import { BaseThunkType, InferActionsTypes } from './redux-store';

let initialState = {
    postsData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 15 },
        { id: 2, message: 'It\'s my first post', likesCount: 20 },
        { id: 3, message: 'It\'s my second post', likesCount: 21 },
        { id: 4, message: 'It\'s my coolest post', likesCount: 4 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action:ActionsTypes):InitialStateType => {

    switch (action.type) {
        case 'PROFILE/ADD_POST': {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost]
            };
        }
        case 'PROFILE/SET_STATUS': {
            return {
                ...state,
                status: action.status
            };
        }
        case 'PROFILE/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            };
        }
        case 'PROFILE/DELETE_POST': {
            return {
                ...state,
                postsData: state.postsData.filter(post => post.id !== action.postId)
            }
        }
        case 'PROFILE/SAVE_PHOTO_SUCCESS': {
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType // временно
            }
        }
        default:
            return state;
    }
}

export type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    addPostActionCreator: (newPostText: string) => ({ type: 'PROFILE/ADD_POST', newPostText } as const),
    setUserProfileActionCreator: (profile: ProfileType) => ({ type: 'PROFILE/SET_USER_PROFILE', profile } as const),
    setStatusActionCreator: (status: string) => ({ type: 'PROFILE/SET_STATUS', status } as const),
    deletePostActionCreator: (postId: number) => ({ type: 'PROFILE/DELETE_POST', postId } as const),
    savePhotoSuccessActionCreator: (photos: PhotosType) => ({ type: 'PROFILE/SAVE_PHOTO_SUCCESS', photos } as const)
}

export type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

export const getUserProfileThunkCreator = (userId:number):ThunkType => async (dispatch) => {
    const responseData = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfileActionCreator(responseData));
};

export const getStatusThunkCreator = (userId:number):ThunkType => async (dispatch) => {
    const responseData = await profileAPI.getStatus(userId);
    dispatch(actions.setStatusActionCreator(responseData));
};

export const updateStatusThunkCreator = (status:string):ThunkType => async (dispatch) => {
    try { // пробуем это выпонять
        const responseData = await profileAPI.updateStatus(status);
        if (responseData.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setStatusActionCreator(status));
        }
    } catch (error) { //но если поймали ошибку, то выполнить ....
        // Something
    }
};

export const savePhotoThunkCreator = (file: File):ThunkType => async (dispatch) => {
    const responseData = await profileAPI.savePhoto(file);
    if (responseData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccessActionCreator(responseData.data.photos));
    }
};

export const saveProfileThunkCreator = (profile:ProfileType):ThunkType => async (dispatch , getState) => {
    const userId = getState().auth.userId;
    const responseData = await profileAPI.saveProfile(profile);
    if (responseData.resultCode === ResultCodesEnum.Success) {
        if (userId != null) {
            dispatch(getUserProfileThunkCreator(userId));
        } else {
            throw new Error("userId can't be null");
        }
    } else {
        dispatch(stopSubmit("edit-profile", { _error: responseData.messages[0] }));
        // dispatch(stopSubmit("edit-profile", { "contacts": {"facebook": response.data.messages[0]} }));
        // необходимо распарсить ошибку для каждого случая (выглядеть должно примерно так, но у нас hardcode)
        return Promise.reject(responseData.messages[0]);
    }
}

export default profileReducer;