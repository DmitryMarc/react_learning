import { ResultCodesEnum } from './../api/api';
import { PhotosType, UserType } from './../types/types';
import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";
import { AppStateType, InferActionsTypes } from './redux-store';
import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';

// const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
// const SET_USERS = 'SET_USERS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
// const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

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
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            };
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            };
        case 'SET_USERS':
            return {
                ...state,
                users: [...action.users]
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            };
        case 'SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.count
            };
        case 'TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            };
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
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

type ActionsTypes = InferActionsTypes<typeof actionCreators>;

export const actionCreators = {
    followSuccessActionCreator: (userId: number) =>
        ({ type: 'FOLLOW', userId } as const),
    unfollowSuccessActionCreator:(userId: number) =>
        ({ type: 'UNFOLLOW', userId } as const),
    setUsersActionCreator:(users: Array<UserType>) =>
        ({ type: 'SET_USERS', users } as const),
    setCurrentPageActionCreator:(currentPage: number) =>
        ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
    setUsersTotalCountActionCreator:(totalUsersCount: number) =>
        ({ type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    toggleIsFetchingActionCreator:(isFetching: boolean) =>
        ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgressActionCreator:(isFetching: boolean, userId: number) =>
        ({ type: 'TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

type GetStateType = () => AppStateType; // типа псевдоним
type DispatchType = Dispatch<ActionsTypes>; //типа псевдоним 2.0

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

//ThunkCreator
export const requestUsersThunkCreator = (page:number, pageSize:number):ThunkType => {
    //return Thunk
    return async (dispatch, getState) => {
        dispatch(actionCreators.toggleIsFetchingActionCreator(true));
        dispatch(actionCreators.setCurrentPageActionCreator(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actionCreators.toggleIsFetchingActionCreator(false));
        dispatch(actionCreators.setUsersActionCreator(data.items));
        dispatch(actionCreators.setUsersTotalCountActionCreator(data.totalCount));
    }
}

const _followUnfollowFlow = async (dispatch:DispatchType, userId:number, 
    apiMethod:any, actionCreator:(userId:number) => 
    ActionsTypes) => {
    dispatch(actionCreators.toggleFollowingProgressActionCreator(true, userId));
    let response = await apiMethod(userId);

    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actionCreators.toggleFollowingProgressActionCreator(false, userId));
}

//ThunkCreator
export const follow = (userId:number):ThunkType => {
    //return Thunk
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI);
        let actionCreator = actionCreators.followSuccessActionCreator;
        _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

//ThunkCreator
export const unfollow = (userId:number):ThunkType => {
    //return Thunk
    return async (dispatch) => {
        //аналог предыдущей санки, но без использования переменных
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actionCreators.unfollowSuccessActionCreator);
    }
}

export default usersReducer;

