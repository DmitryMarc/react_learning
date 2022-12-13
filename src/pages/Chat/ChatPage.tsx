import { FC, useEffect, useState } from "react";

const webSocketChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}


const ChatPage: FC = () => {
    return (
        <div>
            <Chat />
        </div>
    )

}

const Chat: FC = () => {
    return (
        <div>
            <Messages />
            <AddMessageForm />
        </div>
    )
}

const Messages: FC = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        webSocketChannel.addEventListener('message', (e: MessageEvent) => {
            //console.log(JSON.parse(e.data));
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
            // [...messages, ...newMessages]
        });
    }, [])

    // const messages = [1, 2, 3, 4];
    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {messages.map((message, index) => <Message key={index} message={message} />)}
        </div>
    )
}


const Message: FC<{ message: ChatMessageType }> = ({ message }) => {
    //const message: ChatMessageType = null
    // {
    //     url: 'https://via.placeholder.com/30',
    //     author: 'Dmitry',
    //     text: 'Hello friends!'
    // }
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

    const sendMessage = () => {
        if (!message) {
            return;
        }
        webSocketChannel.send(message);
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage;