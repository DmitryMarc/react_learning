import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startMessagesListeningTC, stopMessagesListeningTC
} from "../Redux/chat-reducer";
import { AppDispatchType } from "../Redux/redux-store";
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

    useEffect(() => {
        dispatch(startMessagesListeningTC());
        return () => {
            dispatch(stopMessagesListeningTC());
        }
    }, [])

    return (
        <div>
            {status === "error" && <div>Some error occured. Please refresh the page</div>}
            <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    )
}

export default ChatPage;