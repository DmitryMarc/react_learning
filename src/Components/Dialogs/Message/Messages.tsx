import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { reset } from 'redux-form';
import { InitialStateType, sendMessageThunkCreator, setMessagesWithUserThunkCreator }
    from '../../../Redux/dialogs-reducer';
import { getUserProfileThunkCreator } from '../../../Redux/profile-reducer';
import { AppDispatchType } from '../../../Redux/redux-store';
import { selectAuthorizedUserId } from '../../../Redux/selectors/auth-selectors';
import Preloader from '../../common/Preloader/Preloader';
import { AddMessageFormRedux } from '../Dialogs';
import styles from './../Dialogs.module.css';
import Message from './Message';

type DialogsType = Pick<InitialStateType, "dialogs">['dialogs'];

type ParamsType = { userId: string };

type NewMessageFormValuesType = {
    newMessageBody: string,
}

const getCurrentDialog = (dialogs: DialogsType, params: ParamsType) => {
    for (let i = 0; i < dialogs.length; i++) {
        const currentDialog = dialogs[i];
        for (let key in currentDialog) {
            if ("id" === key && currentDialog[key].toString() === params.userId) {
                return currentDialog;
            }
        }
    }
}

const Messages: FC<InitialStateType> = (props) => {
    const { dialogs, messages } = props;
    const dispatch: AppDispatchType = useDispatch();
    const authorizedUserId = useSelector(selectAuthorizedUserId);
    const params: ParamsType = useParams();

    const currentDialog = getCurrentDialog(dialogs, params);

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
        // Чтобы не было бага c формой отправки сообщения после перезагрузки страницы
        dispatch(setMessagesWithUserThunkCreator(+params.userId));

        if (authorizedUserId) {
            dispatch(getUserProfileThunkCreator(authorizedUserId));
        }
    }, [])

    useEffect(() => {
        if (isAutoScroll) {
            // Скроллинг при изменении сообщений
            messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    let messagesElements = messages.map(message =>
        <Message authorizedUserId={authorizedUserId} dialogPhoto={currentDialog?.photos}
            message={message} key={message.id} />
    );
    const addNewMessage = async (values: NewMessageFormValuesType) => {
        dispatch(sendMessageThunkCreator(+params.userId, values.newMessageBody));
        dispatch(reset('dialogAddMessageForm'));
    }

    if (!messages) {
        return <Preloader />
    }
    return (
        <>
            <div className={styles.messagesWrapper} onScroll={scrollHandler}>
                <div className={styles.messages}>
                    {messagesElements}
                    <div ref={messagesAnchorRef}></div>
                </div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </>
    );
}

export default Messages;