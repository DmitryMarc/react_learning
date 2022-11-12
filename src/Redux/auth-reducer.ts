import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI, securityAPI } from "../api/api";
import { AppStateType } from "./redux-store";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL = 'auth/GET_CAPTCHA_URL';

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null // if null, then captcha is not required
};

type InitialStateType = typeof initialState;

const authReducer = (state = initialState, action:ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType;

type SetAuthUserDataActionPayloadType = {
    userId: number | null, 
    email: string | null, 
    login: string | null,
    isAuth: boolean,
    captchaUrl?: string | null
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA, 
    payload: SetAuthUserDataActionPayloadType
}
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean, captchaUrl?: string | null):SetAuthUserDataActionType => (
    { type: SET_USER_DATA, payload: { userId, email, login, isAuth, captchaUrl } });

// type GetCaptchaUrlSuccessActionPayloadType = {
//     captchaUrl: string
// }
type GetCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL, 
    // payload: GetCaptchaUrlSuccessActionPayloadType
    payload: { captchaUrl: string }
}
export const getCaptchaUrlSuccess = (captchaUrl:string):GetCaptchaUrlSuccessActionType => (
    { type: GET_CAPTCHA_URL, payload: { captchaUrl } });

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const getAuthUserDataTC = ():ThunkType => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const loginTC = (email: string, password: string, rememberMe:boolean, captcha: string):ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserDataTC());
    }
    else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrlTC());
        }
        let message = response.data.messages.length > 0
            ? response.data.messages[0]
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
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logoutTC = ():ThunkType => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false, null));
    }
}

export default authReducer;



