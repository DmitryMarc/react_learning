import { FC, memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageAPIType } from "../../api/chat-api";
import { sendMessageTC } from "../../Redux/chat-reducer";
import { AppDispatchType } from "../../Redux/redux-store";
import { selectChatMessages, selectStatusWS } from "../../Redux/selectors/chat-selectors";
import { AutoComplete, Input, Button, Row, Col, Divider } from 'antd';

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
        <div style={{ height: '600px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messages.map((message, index) => <Message key={message.id} message={message} />)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

const Message: FC<{ message: ChatMessageAPIType }> = memo(({ message }) => {
    return (
        <div>
            <Divider />
            <img src={message.photo} width="50px" />
            <b>{message.userName}</b>
            <br />
            <p>
            {message.message}
            </p>
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
        setMessage('');
    }
    const { TextArea } = Input;
    return (
        <div>
            <Row style={{ margin: "10px 0 0 0" }}>
                <Col span={6}>
                    <div>
                        {/* <textarea onChange={(e) => setMessage(e.currentTarget.value)}
                    value={message}></textarea> */}
                        <AutoComplete
                            style={{ width: "100%" }}
                            value={message}
                        >
                            <TextArea
                                placeholder="input here"
                                className="custom"
                                style={{ height: 70 }}
                                onChange={(e) => setMessage(e.currentTarget.value)}
                                allowClear
                            />
                        </AutoComplete>
                    </div>
                </Col>
                <Col span={18}></Col>
            </Row>
            <Row style={{ margin: "5px 0 0 0" }}>
                <Col span={6}>
                    <div>
                        {/* <button disabled={status !== 'ready'}
                    onClick={sendMessageHandler}>Send</button> */}
                        <Button disabled={status !== 'ready'}
                            onClick={sendMessageHandler} style={{ float: "right" }}>Send</Button>
                    </div>
                </Col>
                <Col span={18}></Col>
            </Row>
        </div>
    )
}