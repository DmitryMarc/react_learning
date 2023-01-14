import { instance, APIResponseType, ResultCodesEnum } from "./api";

type APIResponseTypeForDialog = {
    id: number,
    userName: string,
    photos: {
        large: string | null,
        small: string | null
    }
}

type APIResponseTypeForGetMessagesWithUser = {
    error: string | null,
    items: Array<{
        body: string,
        id: string,
        recipientId: number,
        senderId: number,
        senderName: string
    }>,
    totalCount: number
}

type APIResponseTypeForSendMessage<ResultCodeType = ResultCodesEnum> = {
    data: {
        message: {}
    }
    resultCode: ResultCodeType;
    messages: Array<string>;
}

export const dialogsAPI = {
    getDialogs() {
        return instance.get<Array<APIResponseTypeForDialog>>('dialogs')
            .then(response => response.data);
    },
    addNewDialog(userId: number) {
        return instance.put<APIResponseType>(`dialogs/${userId}`)
            .then(response => response.data);
    },
    getMessagesWithUser(userId: number, count: number) {
        return instance.get<APIResponseTypeForGetMessagesWithUser>(`dialogs/${userId}/messages?count=${count}`)
            .then(response => response.data);
    },
    sendMessage(userId: number, message: string) {
        return instance.post<APIResponseTypeForSendMessage>(`dialogs/${userId}/messages`, { body: message })
            .then(response => response.data);
    },
    getNewMessagesCount() {
        return instance.get<number>('dialogs/messages/new/count')
            .then(response => response.data);
    }
}