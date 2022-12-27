import { AppStateType } from "../redux-store";

export const selectDialogsPage = (state: AppStateType) => {
    return state.dialogsPage;
}
