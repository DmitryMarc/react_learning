import { PhotosType, UserType } from './../types/types';
import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";
import { AppStateType } from './redux-store';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //array of users ids
};
type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action:ActionsTypes):InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            };
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.count
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
}

type ActionsTypes = FollowSuccessActionType | UnfollowSuccessActionType |
    SetUsersActionType | SetCurrentPageActionType |
    SetUsersTotalCountActionType | ToggleIsFetchingActionType |
    ToggleFollowingProgressActionType;

type FollowSuccessActionType = { 
    type: typeof FOLLOW, 
    userId: number
};
export const followSuccessActionCreator = (userId:number): FollowSuccessActionType => ({ type: FOLLOW, userId });

type UnfollowSuccessActionType = {
    type: typeof UNFOLLOW, 
    userId: number
}
export const unfollowSuccessActionCreator = (userId:number): UnfollowSuccessActionType =>
    ({ type: UNFOLLOW, userId });

type SetUsersActionType = {
    type: typeof SET_USERS, 
    users: Array<UserType>
}
export const setUsersActionCreator = (users:Array<UserType>): SetUsersActionType =>
    ({ type: SET_USERS, users });

type SetCurrentPageActionType = {
    type: typeof SET_CURRENT_PAGE, 
    currentPage: number
}
export const setCurrentPageActionCreator = (currentPage:number): SetCurrentPageActionType =>
    ({ type: SET_CURRENT_PAGE, currentPage });

type SetUsersTotalCountActionType = {
    type: typeof SET_TOTAL_USERS_COUNT, 
    count: number
}
export const setUsersTotalCountActionCreator = (totalUsersCount:number): SetUsersTotalCountActionType =>
    ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });

type ToggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING, 
    isFetching: boolean
}
export const toggleIsFetchingActionCreator = (isFetching:boolean): ToggleIsFetchingActionType =>
    ({ type: TOGGLE_IS_FETCHING, isFetching });

type ToggleFollowingProgressActionType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, 
    isFetching: boolean,
    userId: number
}
export const toggleFollowingProgressActionCreator = (isFetching:boolean, userId:number): ToggleFollowingProgressActionType =>
    ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

type GetStateType = () => AppStateType; // типа псевдоним
type DispatchType = Dispatch<ActionsTypes>; //типа псевдоним 2.0

// //ThunkCreator
// export const requestUsersThunkCreator = (page:number, pageSize:number) => {
//     //return Thunk
//     return async (dispatch:DispatchType, getState:GetStateType) => {
//         dispatch(toggleIsFetchingActionCreator(true));
//         dispatch(setCurrentPageActionCreator(page));

//         let data = await usersAPI.getUsers(page, pageSize);
//         dispatch(toggleIsFetchingActionCreator(false));
//         dispatch(setUsersActionCreator(data.items));
//         dispatch(setUsersTotalCountActionCreator(data.totalCount));
//     }
// }

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

//ThunkCreator
export const requestUsersThunkCreator = (page:number, pageSize:number):ThunkType => {
    //return Thunk
    return async (dispatch, getState) => {
        dispatch(toggleIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetchingActionCreator(false));
        dispatch(setUsersActionCreator(data.items));
        dispatch(setUsersTotalCountActionCreator(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch:DispatchType, userId:number, 
    apiMethod:any, actionCreator:(userId:number) => 
    FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleFollowingProgressActionCreator(true, userId));
    let response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgressActionCreator(false, userId));
}

//ThunkCreator
export const follow = (userId:number):ThunkType => {
    //return Thunk
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI);
        let actionCreator = followSuccessActionCreator;
        _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

//ThunkCreator
export const unfollow = (userId:number):ThunkType => {
    //return Thunk
    return async (dispatch) => {
        //аналог предыдущей санки, но без использования переменных
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccessActionCreator);
    }
}

export default usersReducer;

