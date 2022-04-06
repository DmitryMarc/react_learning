import { rerenderEntireTree } from "../render";

let state = {
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
}

window.state = state;

export let addPost = () => {
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.postsData.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
}

export let updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export default state;