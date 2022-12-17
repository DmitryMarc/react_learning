import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer} from "redux-form";
import appReducer from "./app-reducer";
import chatReducer from "./chat-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer, 
    form: formReducer,
    app: appReducer,
    chat: chatReducer
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

// type PropertiesTypes<T> = T extends {[key:string]:infer U} ? U : never
// export type InferActionsTypes<T extends {[key:string]:(...arg: any[]) => any}> = ReturnType<PropertiesTypes<T>>

// Одна данная строчка земеняет две предыдущие строчки
export type InferActionsTypes<T> = T extends {[key:string]:(...arg: any[]) => infer U} ? U : never;

export type BaseThunkType<ActionType extends Action, ReturnValue = Promise<void>> = ThunkAction<ReturnValue, AppStateType, unknown, ActionType>;

//Общий тип Dispatch
export type AppDispatchType = typeof store.dispatch;

// @ts-ignore // игнорирования ts-компилятором
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore // игнорирования ts-компилятором
window.__store__ = store;

export default store;


