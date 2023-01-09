import { ResultCodesEnum } from './../api/api';
import { dialogsAPI } from "../api/dialogs-api";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

type DialogType = {
    id: number,
    userName: string,
    photos: {
        large: string | null,
        small: string | null
    }
}
type MessageType = {
    body: string,
    id?: string,
    recipientId?: number,
    senderId?: number,
    senderName?: string
}

let initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<MessageType>
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action:ActionsTypes):InitialStateType => {
    switch(action.type){
        // case "DIALOGS/SEND_MESSAGE":
        //     return {
        //         ...state,
        //         messages: [...state.messages, {body: action.newMessageBody}]
        //     };
        case "DIALOGS/SET_DIALOGS":
            return {
                ...state,
                dialogs: [...action.payload]
            };
        case "DIALOGS/GET_MESSAGES":
            return {
                ...state,
                messages: [...action.payload]
            };
        default:
            return state;
    }

}

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    setDialogsAC: (dialogs: Array<DialogType>) => ({ type: 'DIALOGS/SET_DIALOGS',  payload: dialogs } as const),
    setMessagesWithUserAC: (items: Array<MessageType>) => ({ type: 'DIALOGS/GET_MESSAGES',  payload: items } as const),
    // sendMessageAC: (newMessageBody: string) => ({ type: 'DIALOGS/SEND_MESSAGE', newMessageBody } as const),
}

type ThunkType = BaseThunkType<ActionsTypes>;

export const setDialogsThunkCreator = ():ThunkType => async (dispatch) => {
    const responseData = await dialogsAPI.getDialogs();
    if (responseData) {
        dispatch(actions.setDialogsAC(responseData));
    }
};

export const setMessagesWithUserThunkCreator = (userId: number):ThunkType => async (dispatch) => {
    const responseData = await dialogsAPI.getMessagesWithUser(userId);
    if (responseData) {
        dispatch(actions.setMessagesWithUserAC(responseData.items));
    }
};

export const sendMessageThunkCreator = (userId: number, message: string):ThunkType => async (dispatch) => {
    const responseData = await dialogsAPI.sendMessage(userId, message);
    if (responseData.resultCode === ResultCodesEnum.Success) {
        // dispatch(actions.sendMessageAC(message));
        dispatch(setMessagesWithUserThunkCreator(userId));
    }
};

export const addNewDialogThunkCreator = (userId: number):ThunkType => async (dispatch) => {
    const responseData = await dialogsAPI.addNewDialog(userId);
    if (responseData.resultCode === ResultCodesEnum.Success) {
        dispatch(setDialogsThunkCreator());
    }
};

export default dialogsReducer;

