import { FormAction, stopSubmit } from "redux-form";
import { ResultCodeForCaptchaEnum, ResultCodesEnum } from "../api/api";
import { authAPI } from './../api/auth-api';
import { securityAPI } from './../api/security-api';
import { BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null | undefined // if null, then captcha is not required // Переделать тип поточнее!!!!
};

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action:ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA':
        case 'AUTH/GET_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl?: string | null) => (
        { type: 'AUTH/SET_USER_DATA', payload: { userId, email, login, isAuth, captchaUrl } } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => (
        { type: 'AUTH/GET_CAPTCHA_URL', payload: { captchaUrl } } as const)
}

type ThunkType = BaseThunkType<ActionsTypes | FormAction>; // наши типы или сторонние 

export const getAuthUserDataTC = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.me();
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const loginTC = (email: string, password: string, rememberMe:boolean, captcha: string):ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserDataTC());
    }
    else {
        if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrlTC());
        }
        let message = loginData.messages.length > 0
            ? loginData.messages[0]
            : "Some error";
        // @ts-ignore
        dispatch(stopSubmit("login", { _error: message }));
        // stopSubmit AC от redux-form (внутри мы говорим, 
        //что мы стопаем формочку login и указываем проблемное
        // поле email с описанием проблемы)
    }
}

export const getCaptchaUrlTC = ():ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const logoutTC = ():ThunkType => async (dispatch) => {
    let logoutData = await authAPI.logout();
    if (logoutData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false, null));
    }
}

export default authReducer;



