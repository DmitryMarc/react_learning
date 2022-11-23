import { InferActionsTypes } from "./redux-store";

type DialogType = {
    id: number,
    name: string
}
type MessageType = {
    id: number,
    message: string
}

let initialState = {
    dialogs: [
        { id: 1, name: 'Dmitry' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Victor' },
        { id: 6, name: 'Valery' }
    ] as Array<DialogType>,
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your learning?' },
        { id: 3, message: 'React is the best!' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },
        { id: 6, message: 'Yo' }
    ] as Array<MessageType>
};

export type InitialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action:ActionsTypes):InitialStateType => {
    switch(action.type){
        case "DIALOGS/SEND-MESSAGE":
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }

}

export type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    sendMessageCreator: (newMessageBody: string) => ({ type: 'DIALOGS/SEND-MESSAGE', newMessageBody } as const)
}

export default dialogsReducer;

