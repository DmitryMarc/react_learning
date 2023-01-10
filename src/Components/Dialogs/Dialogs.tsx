import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { setDialogsThunkCreator } from '../../Redux/dialogs-reducer';
import { AppDispatchType } from '../../Redux/redux-store';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { createField, Textarea } from '../common/FormsControls/FormsControls';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { selectDialogsPage } from '../../Redux/selectors/dialogs-selectors';
import { dialogsAPI } from '../../api/dialogs-api';
import { Route } from 'react-router-dom';
import Messages from './Message/Messages';
import { Button, Col, Row } from 'antd';

type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs: FC = () => {
    const dialogsPage = useSelector(selectDialogsPage);
    const dialogs = dialogsPage.dialogs;
    const messages = dialogsPage.messages;
    const dispatch: AppDispatchType = useDispatch();

    useEffect(() => {
        dispatch(setDialogsThunkCreator());
    }, [])

    useEffect(() => {
        dispatch(setDialogsThunkCreator());
    }, [messages])

    let dialogsElements = dialogs.map(dialog =>
        <DialogItem name={dialog.userName} key={dialog.id} id={dialog.id} photo={dialog.photos.small} />
    );

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItemsWrapper}>
                <div className={classes.dialogsItems}>
                    {dialogsElements}
                </div>
            </div>
            <div className={classes.messages}>
                <div>
                    <Route path='/dialogs/:userId/messages' render={() => <Messages dialogs={dialogs} messages={messages} />} />
                </div>
            </div>
        </div>
    );
}

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>;
type PropsType = {}

const AddMessageForm: FC<InjectedFormProps<NewMessageFormValuesType,
    PropsType> & PropsType> = (props) => {
        // const handler = async () => {
        //     const responseData = await dialogsAPI.getNewMessagesCount();
        //     console.log(responseData);
        // }
        return (
            <form onSubmit={props.handleSubmit}>
                <Row>
                    <Col span={12}>
                        <div style={{width: '600px', marginTop: '20px',  padding: '0 10px'}}>
                            {createField<NewMessageFormValuesKeysType>("Enter your message",
                            "newMessageBody", [required, maxLength50], Textarea)}
                        </div>
                    </Col>
                    <Col span={12}></Col>
                    <Col span={12}>
                        {/* <div><button>Send</button></div> */}
                        <div style={{width: '600px', paddingRight: '10px'}}>
                            <Button htmlType='submit' style={{ float: 'right'}}>Send</Button>
                        </div>
                    </Col>
                </Row>
            </form>
        )
    }

export const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, PropsType>({
    form: "dialogAddMessageForm"
})(AddMessageForm)

export default withAuthRedirect(Dialogs);

// Стилизовать форму отправки !
// Продумать архитектуру диалогов !