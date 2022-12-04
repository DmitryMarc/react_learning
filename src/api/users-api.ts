import { GetItemsType, instance, APIResponseType } from "./api";

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data);
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(response => response.data);
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(response => response.data);
    }
    // unfollow(userId:number) {
    //     return instance.delete(`follow/${userId}`).then(response => response.data) as Promise<APIResponseType>;
    // }

    //     getProfile(userId:number) {
    //         return profileAPI.getProfile(userId);
    //     }
}