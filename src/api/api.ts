import { UserType } from './../types/types';
import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "9e7ffe88-7d61-47bb-b771-01c518b60523"
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UserType>,
    totalCount: number,
    error: string | null
}

export type APIResponseType<Data = {}, ResultCodeType = ResultCodesEnum> = {
    data: Data,
    resultCode: ResultCodeType,
    messages: Array<string>
}