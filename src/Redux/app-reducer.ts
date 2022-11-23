import { getAuthUserDataTC } from "./auth-reducer";
import { InferActionsTypes } from "./redux-store";

let initialState = {
    initialized: false
};

type InitialStateType = typeof initialState;

type ActionType = InferActionsTypes<typeof actions>

const appReducer = (state = initialState, action: ActionType):InitialStateType => {
    switch (action.type) {
        case "APP/INITIALIZED_SUCCESS":
            return {
                ...state,
                initialized: true
            };
        default:
            return state;
    }
}

export const actions = {
    initializedSuccess:() => ({type: 'APP/INITIALIZED_SUCCESS'} as const)
}

export const initializeAppTC = () => (dispatch: any) => {
    let promise = dispatch(getAuthUserDataTC());
    Promise.all([promise]).then(() => {
        dispatch(actions.initializedSuccess());
    })
}

export default appReducer;