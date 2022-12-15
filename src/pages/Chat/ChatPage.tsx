import { FC, useEffect, useState } from "react";

// let webSocketChannel:WebSocket; 
// function createChannel(){
// webSocketChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
// }

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
    // let webSocketChannel:WebSocket; 
    const [webSocketChannel, setWebSocketChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket;
        const closeHandler = () => {
            console.log('CLOSE WS');
            //createChannel();
            setTimeout(createChannel, 3000);
        }

        function createChannel() {
            // if (ws !== null){
            // отписываемся от события
            ws?.removeEventListener('close', closeHandler);
            // закрываем канал
            ws?.close();
            // }
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
            setWebSocketChannel(ws);
            //подписываемся на событие
            ws.addEventListener('close', closeHandler);
        }
        createChannel();

        return () => {
            ws.removeEventListener('close', closeHandler);
            ws.close();
        }
    }, [])

    return (
        <div>
            <Messages webSocketChannel={webSocketChannel} />
            <AddMessageForm webSocketChannel={webSocketChannel} />
        </div>
    )
}

const Messages: FC<{ webSocketChannel: WebSocket | null }> = ({ webSocketChannel }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        }
        webSocketChannel?.addEventListener('message', messageHandler);
        return () => {
            webSocketChannel?.removeEventListener('message', messageHandler)
        }
    }, [webSocketChannel])

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

const AddMessageForm: FC<{ webSocketChannel: WebSocket | null }> = ({ webSocketChannel }) => {
    const [message, setMessage] = useState('');
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }
        webSocketChannel?.addEventListener('open', openHandler);

        return () => {
            webSocketChannel?.removeEventListener('open', openHandler);
        }
    }, [webSocketChannel])

    const sendMessage = () => {
        if (!message) {
            return;
        }
        webSocketChannel?.send(message);
        setMessage('')
    }
    return (
        <div>
            <div>
                <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea>
            </div>
            <div>
                {/* <button disabled={webSocketChannel.readyState !== WebSocket.OPEN} onClick={sendMessage}>Send</button> */}
                <button disabled={webSocketChannel === null || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatPage;