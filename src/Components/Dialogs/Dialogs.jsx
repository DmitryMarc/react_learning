import { Field, reduxForm } from 'redux-form';
import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs = (props) => {
    let state = props.dialogsPage;

    let dialogs = state.dialogs;
    let messages = state.messages;

    let dialogsElements = dialogs.map(dialog =>
        <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
    );

    let messagesElements = messages.map(message =>
        <Message message={message.message} key={message.id} />
    );

    let newMessageBody = state.newMessageBody;

    let addNewMessage = (values) => {
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

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component="textarea" name="newMessageBody" placeholder="Enter your message" />
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