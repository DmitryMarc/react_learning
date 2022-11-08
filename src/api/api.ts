import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "9e7ffe88-7d61-47bb-b771-01c518b60523"
    }
});

export const usersAPI = {
    getUsers(currentPage:any, pageSize:any) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    follow(userId:any) {
        return instance.post(`follow/${userId}`);
    },
    unfollow(userId:any) {
        return instance.delete(`follow/${userId}`);
    },
    getProfile(userId:any) {
        return profileAPI.getProfile(userId);
    }
}

export const profileAPI = {
    getProfile(userId:any) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId:any) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status:any) {
        return instance.put(`profile/status`, { status: status });
    },
    savePhoto(photoFile:any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile:any){
        return instance.put(`profile`, profile);
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email: string | null, password: string | null, rememberMe:boolean = false, captcha: string | null = null) { // временно сделал строкой
        return instance.post(`auth/login`, { email, password, rememberMe, captcha });
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`);
    }
}



