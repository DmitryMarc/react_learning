import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs =  (props) => {

    let state = props.dialogsPage;

    let dialogs = state.dialogs;
    let messages = state.messages;

    let dialogsElements = dialogs.map(dialog => 
        <DialogItem name={dialog.name} id={dialog.id} />
    );

    let messagesElements = messages.map(message =>
        <Message message={message.message} /> 
    );
    
    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onNewMessageChange = (evt) => {
        let body = evt.target.value;
        props.updateNewMessageBody(body);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={newMessageBody} onChange={onNewMessageChange} placeholder='Enter your message'></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    );
}

export default Dialogs;