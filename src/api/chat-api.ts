// Тип подписчика
type SubscriberType = (messages: ChatMessageType[]) => void

// Массив подписчиков
let subscribers = [] as SubscriberType[];

let ws: WebSocket | null = null;

const closeHandler = () => {
    console.log('CLOSE WS');
    //createChannel();
    setTimeout(createChannel, 3000);
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers.forEach(subscriber => subscriber(newMessages))
}

function createChannel() {
    // отписываемся от события
    ws?.removeEventListener('close', closeHandler);
    // закрываем канал
    ws?.close();

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    // setWebSocketChannel(ws);
    //подписываемся на событие
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
}

export const chatAPI = {
    startWSChahhel() {
        createChannel();
    },
    stopWSChahhel(){
        // Зануляем подписчиков
        subscribers = [];
        // Удаляем обработчики
        ws?.removeEventListener('close', closeHandler);
        ws?.removeEventListener('message', messageHandler);
        // Закрывваем WS-соединение
        ws?.close();
    },
    // подписка(подписчик)
    subscribe(callback: SubscriberType){
        subscribers.push(callback);
        // 1-ый способ отписки
        return () => {
            subscribers = subscribers.filter(subscriber => subscriber !== callback);
        }
    },
    // 2-ой способ отписки
    unsubscribe(callback:SubscriberType){
        subscribers = subscribers.filter(subscriber => subscriber !== callback);
    },
    // отправка сообщений
    sendMessage(message: string){
        ws?.send(message);
    }
}

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}