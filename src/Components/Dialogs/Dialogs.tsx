import { FC } from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../utils/validators/validators';
import { Textarea } from '../common/FormsControls/FormsControls';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';

type DialogsPropsTypes = {
    dialogsPage: any
    sendMessage: (newMessageBody: string) => void

}

const Dialogs:FC<DialogsPropsTypes> = (props) => {
    let dialogs = props.dialogsPage.dialogs;
    let messages = props.dialogsPage.messages;
    //@ts-ignore
    let dialogsElements = dialogs.map(dialog =>
        <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
    );
    //@ts-ignore
    let messagesElements = messages.map(message =>
        <Message message={message.message} key={message.id} />
    );

    let newMessageBody = props.dialogsPage.newMessageBody;

    let addNewMessage = (values:any) => {
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

type AddMessageFormPropsType = {
    handleSubmit: any
}

const AddMessageForm:FC<AddMessageFormPropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} 
                validate={[required, maxLength50]} name="newMessageBody" placeholder="Enter your message" />
                {/* <textarea value={newMessageBody} onChange={onNewMessageChange} placeholder='Enter your message'></textarea> */}
            </div>
            <div><button>Send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({
form: "dialogAddMessageForm"
})(AddMessageForm)

export default Dialogs;




