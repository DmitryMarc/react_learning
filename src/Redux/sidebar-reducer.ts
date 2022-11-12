let initialState = {};
type InitialStateType = typeof initialState;

const sidebarReducer = (state = initialState, action:ActionsTypes):InitialStateType => {
    return state;
}

type ActionsTypes = any;

export default sidebarReducer;