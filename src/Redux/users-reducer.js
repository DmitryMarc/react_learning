import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
                //     users: state.users.map(user => {
                //         if (user.id === action.userId) {
                //             return { ...user, followed: true }
                //         }
                //         return user;
                //     })
            };

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
                // users: state.users.map(user => {
                //     if (user.id === action.userId) {
                //         return { ...user, followed: false }
                //     }
                //     return user;
                // })
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

export const followSuccessActionCreator = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccessActionCreator = (userId) =>
    ({ type: UNFOLLOW, userId });
export const setUsersActionCreator = (users) =>
    ({ type: SET_USERS, users });
export const setCurrentPageActionCreator = (currentPage) =>
    ({ type: SET_CURRENT_PAGE, currentPage });
export const setUsersTotalCountActionCreator = (totalUsersCount) =>
    ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount });
export const toggleIsFetchingActionCreator = (isFetching) =>
    ({ type: TOGGLE_IS_FETCHING, isFetching });
export const toggleFollowingProgressActionCreator = (isFetching, userId) =>
    ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId });

//ThunkCreator
export const requestUsersThunkCreator = (page, pageSize) => {
    //return Thunk
    return async (dispatch) => {
        dispatch(toggleIsFetchingActionCreator(true));
        dispatch(setCurrentPageActionCreator(page));

        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetchingActionCreator(false));
        dispatch(setUsersActionCreator(data.items));
        dispatch(setUsersTotalCountActionCreator(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgressActionCreator(true, userId));
    let response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgressActionCreator(false, userId));
}

//ThunkCreator
export const follow = (userId) => {
    //return Thunk
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI);
        let actionCreator = followSuccessActionCreator;
        followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
    }
}

//ThunkCreator
export const unfollow = (userId) => {
    //return Thunk
    return async (dispatch) => {
        //аналог предыдущей санки, но без использования переменных
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccessActionCreator);
    }
}

export default usersReducer;

