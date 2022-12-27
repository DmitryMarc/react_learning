import { FC, memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageAPIType } from "../../api/chat-api";
import { sendMessageTC } from "../../Redux/chat-reducer";
import { AppDispatchType } from "../../Redux/redux-store";
import { selectChatMessages, selectStatusWS } from "../../Redux/selectors/chat-selectors";

export const Messages: FC = () => {
    const messages = useSelector(selectChatMessages);
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs(element.scrollHeight - element.scrollTop) - element.clientHeight < 300) {
            !isAutoScroll && setIsAutoScroll(true);
        }
        else {
            isAutoScroll && setIsAutoScroll(false);
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            // Скроллинг при изменении сообщений
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    return (
        <div style={{ height: '400px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((message, index) => <Message key={message.id} message={message} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: FC<{ message: ChatMessageAPIType }> = memo(({ message }) => {
    return (
        <div>
            <img src={message.photo} width="50px" />
            <b>{message.userName}</b>
            <br />
            {message.message}
            <hr />
        </div>
    )
})

export const AddMessageForm: FC = () => {
    const [message, setMessage] = useState('');
    const dispatch: AppDispatchType = useDispatch();
    const status = useSelector(selectStatusWS);

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
                <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                    value={message}></textarea>
            </div>
            <div>
                {/* <button disabled={webSocketChannel.readyState
                 !== WebSocket.OPEN} onClick={sendMessage}>Send</button> */}
                <button disabled={status !== 'ready'}
                    onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    )
}