import { FC, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { reset } from 'redux-form';
import { InitialStateType, sendMessageThunkCreator } from '../../../Redux/dialogs-reducer';
import { AppDispatchType } from '../../../Redux/redux-store';
import { AddMessageFormRedux } from '../Dialogs';
import classes from './../Dialogs.module.css';
import Message from './Message';

type MessagesPropsType =  Pick<InitialStateType, "messages">

type NewMessageFormValuesType = {
    newMessageBody: string
}

const Messages: FC<MessagesPropsType> = (props) => {
    const messages = props.messages;
    const dispatch: AppDispatchType = useDispatch();
    const params: {userId: string} = useParams();
    
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

    let messagesElements = messages.map(message =>
            <Message message={message.body} key={message.id} />
    );
    let addNewMessage = async (values: NewMessageFormValuesType) => {
        dispatch(sendMessageThunkCreator(+params.userId, values.newMessageBody));
        dispatch(reset('dialogAddMessageForm'));
    }
    return (
        <>
        <div style={{ height: '500px', overflowY: 'auto' }} onScroll={scrollHandler}>
            {messagesElements}
            <div ref={messagesAnchorRef}></div>
        </div>
            <AddMessageFormRedux  onSubmit={addNewMessage} />
        </>
        
    );
}

export default Messages;