const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

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
            ]
        },
        profilePage:  {
            postsData: [
                { id: 1, message: 'Hi, how are you?', likesCount: 15 },
                { id: 2, message: 'It\'s my first post', likesCount: 20 },
                { id: 2, message: 'It\'s my second post', likesCount: 21 },
                { id: 2, message: 'It\'s my coolest post', likesCount: 4 }
            ],
            newPostText: 'Dmitry.com'
        }
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
        if(action.type === ADD_POST){
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.postsData.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        } else if (action.type === UPDATE_NEW_POST_TEXT){
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }
    }
}

export const addPostActionCreator = () => ({type: ADD_POST});

export const updateNewPostTextActionCreator = (text) => 
({type: UPDATE_NEW_POST_TEXT, newText: text});


export default store;

window.store = store;