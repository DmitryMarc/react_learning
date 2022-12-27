import { AppStateType } from "../redux-store";

export const selectIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}

export const selectCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl;
}

export const selectCurrentUserLogin = (state: AppStateType) => {
    return state.auth.login;
}

export const selectAuthorizedUserId = (state: AppStateType) => {
    return state.auth.userId;
}