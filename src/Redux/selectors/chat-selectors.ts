import { AppStateType } from "../redux-store";

export const selectStatusWS = (state: AppStateType) => {
    return state.chat.status;
}

export const selectChatMessages = (state: AppStateType) => {
    return state.chat.messages;
}
