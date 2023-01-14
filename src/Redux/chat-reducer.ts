import { FormAction } from "redux-form";
import { chatAPI, ChatMessageAPIType, StatusType } from "../api/chat-api";
import { AppDispatchType, BaseThunkType, InferActionsTypes } from "./redux-store";
import {v1} from 'uuid';

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
};

type InitialStateType = typeof initialState;

type ChatMessageType = ChatMessageAPIType & {id: string};

const chatReducer = (state = initialState, action:ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages
                    .map(message => ({...message, id: v1()}))]
                    .filter((message, index, array) => index >= array.length - 100)
            };
        case 'CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            };
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => (
        { type: 'CHAT/MESSAGES_RECEIVED', payload: { messages } } as const),
    statusChanged: (status: StatusType) => (
        { type: 'CHAT/STATUS_CHANGED', payload: { status } } as const)
}

type ThunkType = BaseThunkType<ActionsTypes | FormAction>; // наши типы или сторонние 

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: AppDispatchType) => {
    if (_newMessageHandler === null) {
        //инициализация
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler;
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: AppDispatchType) => {
    if (_statusChangedHandler === null) {
        //инициализация
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler;
}

export const startMessagesListeningTC = ():ThunkType => async (dispatch) => {
    chatAPI.startWSChahhel();
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
}

export const stopMessagesListeningTC = ():ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received',newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
    chatAPI.stopWSChahhel();
}

export const sendMessageTC = (message: string):ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message);
}

export default chatReducer;
