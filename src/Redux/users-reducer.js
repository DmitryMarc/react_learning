const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [
        // { id: 1, photoUrl: 'https://cdn.fishki.net/upload/post/201501/16/1389597/b81f8a601f73a27b369abd60a8f9b729.jpg', followed: false, fullName: 'Dmitry', status: 'I am a boss', location: {city: 'Minsk', country: 'Belarus'} },
        // { id: 2, photoUrl: 'https://cdn.fishki.net/upload/post/201501/16/1389597/b81f8a601f73a27b369abd60a8f9b729.jpg', followed: true, fullName: 'Sasha', status: 'I am a loser', location: {city: 'Moskow', country: 'Russia'} },
        // { id: 3, photoUrl: 'https://cdn.fishki.net/upload/post/201501/16/1389597/b81f8a601f73a27b369abd60a8f9b729.jpg', followed: false, fullName: 'Andrew', status: 'I am a boss too', location: {city: 'Kiev', country: 'Ukraine'} }
    ]
};

const usersReducer = (state = initialState, action) => {

    switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.userId){
                        return {...user, followed: true}
                    }
                    return user;
                })
            };

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if(user.id === action.userId){
                        return {...user, followed: false}
                    }
                    return user;
                })
            };
        case SET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.users]
            }

        default: 
            return state;
    }
}

export const followActionCreator = (userId) => ({type: FOLLOW, userId});
export const unfollowActionCreator = (userId) => 
({type: UNFOLLOW, userId});
export const seUsersActionCreator = (users) => 
({type: SET_USERS, users});

export default usersReducer;