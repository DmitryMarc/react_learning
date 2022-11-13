import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { authAPI, ResultCodeForCaptcha, ResultCodesEnum, securityAPI } from "../api/api";
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
    let meData = await authAPI.me();
    //response.data.data.id
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, login, email } = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const loginTC = (email: string, password: string, rememberMe:boolean, captcha: string):ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserDataTC());
    }
    else {
        if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
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
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logoutTC = ():ThunkType => async (dispatch) => {
    let logoutData = await authAPI.logout();
    if (logoutData.resultCode === ResultCodesEnum.Success) {
        dispatch(setAuthUserData(null, null, null, false, null));
    }
}

export default authReducer;



