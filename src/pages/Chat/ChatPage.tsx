import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageType } from "../../api/chat-api";
import { sendMessageTC, startMessagesListeningTC, stopMessagesListeningTC } from "../../Redux/chat-reducer";
import { AppDispatchType, AppStateType } from "../../Redux/redux-store";

const ChatPage: FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )
}

const Chat: FC = () => {
    const dispatch: AppDispatchType = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListeningTC());
        return () => {
            dispatch(stopMessagesListeningTC());
        }
    }, [])

    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages: FC = () => {
    const messages = useSelector((state:AppStateType) => state.chat.messages);

    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {messages.map((message, index) => <Message key={index} message={message} />)}
        </div>
    )
}

const Message: FC<{ message: ChatMessageType }> = ({ message }) => {
    return (
        <div>
            <img src={message.photo} width="50px" />
            <b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    )
}

const AddMessageForm: FC = () => {
    const [message, setMessage] = useState('');
    // const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

    const dispatch: AppDispatchType = useDispatch();

    const sendMessageHandler = () => {
        if (!message) {
            return;
        }
        dispatch(sendMessageTC(message));
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                {/* <button disabled={webSocketChannel.readyState !== WebSocket.OPEN} onClick={sendMessage}>Send</button> */}
                <button disabled={false} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage;