const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: 'Dmitry' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Sasha' },
        { id: 5, name: 'Victor' },
        { id: 6, name: 'Valery' }
    ],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your learning?' },
        { id: 3, message: 'React is the best!' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },
        { id: 6, message: 'Yo' }
    ],
    newMessageBody: ""
};

const dialogsReducer = (state = initialState, action) => {

    switch(action.type){
        case UPDATE_NEW_MESSAGE_BODY:{
            let stateCopy = {...state};
            stateCopy.newMessageBody = action.body;
            return stateCopy;
        }
        case SEND_MESSAGE:{
            let stateCopy = {...state};
            let body = stateCopy.newMessageBody;
            stateCopy.newMessageBody = '';
            stateCopy.messages = [...state.messages];
            stateCopy.messages.push({ id: 7, message: body });
            return stateCopy;
        }
        default:
            return state;

    }

}

export const sendMessageCreator = () => ({type: SEND_MESSAGE});
export const updateNewMessageBodyCreator = (body) => 
({type: UPDATE_NEW_MESSAGE_BODY, body: body});

export default dialogsReducer;