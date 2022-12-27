import { AppStateType } from "../redux-store";

export const selectProfile = (state: AppStateType) => {
    return state.profilePage.profile;
}

export const selectStatus = (state: AppStateType) => {
    return state.profilePage.status;
}

export const selectPostsData = (state: AppStateType) => {
    return state.profilePage.postsData;
}
