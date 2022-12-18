// Тип подписчика
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

// Массив подписчиков
const subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
};

let ws: WebSocket | null = null;

type EventsNamesType = 'messages-received' | 'status-changed';

const closeHandler = () => {
    // Уведомляем подписчика о статусе
    notifySubscribersAboutStatus('pending');
    setTimeout(createChannel, 3000);
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data);
    subscribers['messages-received'].forEach(subscriber => subscriber(newMessages))
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready');
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error');
    console.error('REFRESH PAGE')
}

const cleanUp = () => {
        ws?.removeEventListener('close', closeHandler);
        ws?.removeEventListener('message', messageHandler);
        ws?.removeEventListener('open', openHandler);
        ws?.removeEventListener('error', errorHandler);
}

// Вспомогательная функция
const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(subscriber => subscriber(status));
}

function createChannel() {
    // отписываемся от событий
    cleanUp();
    // закрываем канал
    ws?.close();

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

    // пока событие open не произошло
    notifySubscribersAboutStatus('pending');
    //подписываемся на события
    ws.addEventListener('close', closeHandler);
    ws.addEventListener('message', messageHandler);
    ws.addEventListener('open', openHandler);
    ws.addEventListener('error', errorHandler);
}

export const chatAPI = {
    startWSChahhel() {
        createChannel();
    },
    stopWSChahhel(){
        // Зануляем подписчиков
        subscribers['messages-received'] = [];
        subscribers['status-changed'] = [];
        // Удаляем обработчики
        cleanUp();
        // Закрывваем WS-соединение
        ws?.close();
    },
    // подписка(подписчик)
    subscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType){
        //@ts-ignore
        subscribers[eventName].push(callback);
        // 1-ый способ отписки
        return () => {
            //@ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(subscriber => subscriber !== callback);
        }
    },
    // 2-ой способ отписки
    unsubscribe(eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType){
        //@ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(subscriber => subscriber !== callback);
    },
    // отправка сообщений
    sendMessage(message: string){
        ws?.send(message);
    }
}

export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

export type StatusType = 'pending' | 'ready' | 'error';