import { APIResponseType, ResultCodesEnum } from './../api/api';
import { UserType } from './../types/types';
import { updateObjectInArray } from "../utils/object-helpers";
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { Dispatch } from 'react';
import { usersAPI } from '../api/users-api';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number> //array of users ids
};
export type InitialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            };
        case 'USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            };
        case 'USERS/SET_USERS':
            return {
                ...state,
                users: [...action.users]
            };
        case 'USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            };
        case 'USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.count
            };
        case 'USERS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            };
        case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
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
        ({ type: 'USERS/FOLLOW', userId } as const),
    unfollowSuccessActionCreator: (userId: number) =>
        ({ type: 'USERS/UNFOLLOW', userId } as const),
    setUsersActionCreator: (users: Array<UserType>) =>
        ({ type: 'USERS/SET_USERS', users } as const),
    setCurrentPageActionCreator: (currentPage: number) =>
        ({ type: 'USERS/SET_CURRENT_PAGE', currentPage } as const),
    setUsersTotalCountActionCreator: (totalUsersCount: number) =>
        ({ type: 'USERS/SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
    toggleIsFetchingActionCreator: (isFetching: boolean) =>
        ({ type: 'USERS/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgressActionCreator: (isFetching: boolean, userId: number) =>
        ({ type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const)
}

type ThunkType = BaseThunkType<ActionsTypes>;

//ThunkCreator
export const requestUsersThunkCreator = (page: number, pageSize: number): ThunkType => {
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

const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number,
    apiMethod: (userId: number) => Promise<APIResponseType>, actionCreator: (userId: number) =>
        ActionsTypes) => {
    dispatch(actionCreators.toggleFollowingProgressActionCreator(true, userId));
    let response = await apiMethod(userId);

    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(actionCreators.toggleFollowingProgressActionCreator(false, userId));
}

//ThunkCreator
export const follow = (userId: number): ThunkType => {
    //return Thunk
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI);
        let actionCreator = actionCreators.followSuccessActionCreator;
        await _followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

//ThunkCreator
export const unfollow = (userId: number): ThunkType => {
    //return Thunk
    return async (dispatch) => {
        //аналог предыдущей санки, но без использования переменных
        await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actionCreators.unfollowSuccessActionCreator);
    }
}

export default usersReducer;

