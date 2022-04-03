import { NavLink } from 'react-router-dom';
import classes from './Dialogs.module.css';

const DialogItem = (props) => {
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    );
}

const Message = (props) => {
    return (
        <div className={classes.dialog}>{props.message}</div>
    );
}


const Dialogs =  (props) => {

    let dialogs = [
        {id: 1, name: 'Dmitry'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valery'}
    ];

    let messages = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your learning?'},
        {id: 3, message: 'React is the best!'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'Yo'}
    ];

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