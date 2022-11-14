import { PhotosType, ProfileType, UserType } from './../types/types';
import axios, { AxiosResponse } from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "9e7ffe88-7d61-47bb-b771-01c518b60523"
    }
});

type GetUsersType = {
    items: Array<UserType>,
    totalCount: number,
    error: string
}

type TotalApiType = {
    data: Object, //Может быть не правильно!
    resultCode: ResultCodesEnum,
    messages: Array<string>
}

export const usersAPI = {
    getUsers(currentPage:number, pageSize:number) {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(userId:number) {
        return instance.post<TotalApiType>(`follow/${userId}`).then(response => response.data);
    },
    unfollow(userId:number) {
        return instance.delete<TotalApiType>(`follow/${userId}`).then(response => response.data);
    },
    getProfile(userId:number) {
        return profileAPI.getProfile(userId);
    }
}

type SavePhotoType = {
    data: PhotosType,
    resultCode: ResultCodesEnum,
    messages: Array<string>
}

export const profileAPI = {
    getProfile(userId:number) {
        return instance.get<ProfileType>(`profile/` + userId).then(response => response.data);
    },
    getStatus(userId:number) {
        return instance.get<string>(`profile/status/` + userId).then(response => response.data);
    },
    updateStatus(status:string) {
        return instance.put<TotalApiType>(`profile/status`, { status: status }).then(response => response.data);
    },
    savePhoto(photoFile:any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<SavePhotoType>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data);
    },
    saveProfile(profile:ProfileType){
        return instance.put<TotalApiType>(`profile`, profile).then(response => response.data);
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}

type MeResponseType = {
    data:{
        id:number, 
        email:string, 
        login:string
    },
    resultCode: ResultCodesEnum,
    messages: Array<string>
}

type LoginResponseType = {
    data:{
        userId:number
    },
    resultCode: ResultCodesEnum | ResultCodeForCaptcha,
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(response => response.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) { // временно сделал строкой
        return instance.post<LoginResponseType>(`auth/login`, { email, password, rememberMe, captcha })
        .then(response => response.data);
    },
    logout() {
        return instance.delete<TotalApiType>(`auth/login`).then(response => response.data);
    }
}

type GetCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`).then(response => response.data);
    }
}

// authAPI.me().then((res:AxiosResponse<number>) => res.data.)

// instance.get(`auth/me`).then((res:AxiosResponse<string>) => res.data.toUpperCase())

// instance.get<string>(`auth/me`).then((res) => res.data.toLowerCase)
