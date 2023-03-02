import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
    startMessagesListeningTC, stopMessagesListeningTC
} from "../Redux/chat-reducer";
import { AppDispatchType } from "../Redux/redux-store";
import { selectIsAuth } from "../Redux/selectors/auth-selectors";
import { selectStatusWS } from "../Redux/selectors/chat-selectors";
import { AddMessageForm, Messages } from "./Chat/Chat";

const ChatPage: FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: FC = () => {
    const dispatch: AppDispatchType = useDispatch();
    const status = useSelector(selectStatusWS);
    const isAuth = useSelector(selectIsAuth);

    useEffect(() => {
        dispatch(startMessagesListeningTC());
        console.log("Mounted");

        return () => {
            console.log("Unmounted");
            dispatch(stopMessagesListeningTC());
        }
    }, [])

    if (!isAuth){
        return <Redirect to="/login" />
    }

    return (
        <div>
            {status === "error" &&
                <div>Some error occured. Please refresh the page</div>}
                <Messages />
                <AddMessageForm />
        </div>
    )
}

export default ChatPage;