import { FormAction } from "redux-form";
import { chatAPI, ChatMessageType } from "../api/chat-api";
import { AppDispatchType, BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
    messages: [] as ChatMessageType[]
};

type InitialStateType = typeof initialState;

const chatReducer = (state = initialState, action:ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            };
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => (
        { type: 'CHAT/MESSAGES_RECEIVED', payload: { messages } } as const)
}

type ThunkType = BaseThunkType<ActionsTypes | FormAction>; // наши типы или сторонние 

let _newMessageHandlerCreator: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: AppDispatchType) => {
    if (_newMessageHandlerCreator === null) {
        //инициализация
        _newMessageHandlerCreator = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandlerCreator;
}

export const startMessagesListeningTC = ():ThunkType => async (dispatch) => {
    chatAPI.startWSChahhel();
    chatAPI.subscribe(newMessageHandlerCreator(dispatch));
}

export const stopMessagesListeningTC = ():ThunkType => async (dispatch) => {
    chatAPI.unsubscribe (newMessageHandlerCreator(dispatch));
    chatAPI.stopWSChahhel();
}

export const sendMessageTC = (message: string):ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message);
}

export default chatReducer;
