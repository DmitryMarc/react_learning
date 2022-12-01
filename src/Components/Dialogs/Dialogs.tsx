import { FC } from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { InitialStateType } from '../../Redux/dialogs-reducer';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { createField, Textarea } from '../common/FormsControls/FormsControls';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';

export type DialogsPropsTypes = {
    dialogsPage: InitialStateType,
    sendMessage: (messageText: string) => void
}

type NewMessageFormValuesType = {
    newMessageBody: string
}

const Dialogs:FC<DialogsPropsTypes> = (props) => {
    let dialogs = props.dialogsPage.dialogs;
    let messages = props.dialogsPage.messages;

    let dialogsElements = dialogs.map(dialog =>
        <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
    );

    let messagesElements = messages.map(message =>
        <Message message={message.message} key={message.id} />
    );

    let addNewMessage = (values:NewMessageFormValuesType) => {
        props.sendMessage(values.newMessageBody);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage} />
            </div>
        </div>
    );
}

const maxLength50 = maxLengthCreator(50);

type NewMessageFormValuesKeysType = Extract<keyof NewMessageFormValuesType, string>;
type PropsType = {}

const AddMessageForm:FC<InjectedFormProps<NewMessageFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                {createField<NewMessageFormValuesKeysType>("Enter your message", "newMessageBody", [required, maxLength50], Textarea)}
            </div>
            <div><button>Send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<NewMessageFormValuesType, PropsType>({
form: "dialogAddMessageForm"
})(AddMessageForm)

export default Dialogs;




