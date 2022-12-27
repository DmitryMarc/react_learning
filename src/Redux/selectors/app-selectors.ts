import { AppStateType } from "../redux-store";

export const selectIsInitialized = (state: AppStateType) => {
    return state.app.initialized;
}
