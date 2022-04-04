import DialogItem from './DialogItem/DialogItem';
import classes from './Dialogs.module.css';
import Message from './Message/Message';

const Dialogs =  (props) => {

    let dialogs = props.state.dialogs;
    let messages = props.state.messages;

    let dialogsElements = dialogs.map(dialog => 
        <DialogItem name={dialog.name} id={dialog.id} />
    );

    let messagesElements = messages.map(message =>
        <Message message={message.message} /> 
    );

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
            </div>
        </div>
    );
}

export default Dialogs;