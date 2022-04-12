import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        dialogsPage: {
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
        },
        profilePage:  {
            postsData: [
                { id: 1, message: 'Hi, how are you?', likesCount: 15 },
                { id: 2, message: 'It\'s my first post', likesCount: 20 },
                { id: 2, message: 'It\'s my second post', likesCount: 21 },
                { id: 2, message: 'It\'s my coolest post', likesCount: 4 }
            ],
            newPostText: 'Dmitry.com'
        },
        sideBar: {}
    },
    _callSubscriber(){
        console.log('State chaged');
    },


    getState(){
        return this._state;
    },
    subscribe(observer){
        this._callSubscriber = observer; // pattern, наблюдатель
    },

    
    dispatch(action){ // action: {type: 'ADD-POST'}

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sideBar = sidebarReducer(this._state.sideBar, action);

        this._callSubscriber(this._state);

    }
}

export default store;

window.store = store;