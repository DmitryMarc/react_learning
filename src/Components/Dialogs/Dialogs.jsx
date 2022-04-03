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
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                <DialogItem name='Dmitry' id='1' />
                <DialogItem name='Andrey' id='2' />
                <DialogItem name='Sveta' id='3' />
                <DialogItem name='Sasha' id='4' />
                <DialogItem name='Victor' id='5' />
                <DialogItem name='Valery' id='6' />
            </div>
            <div className={classes.messages}>
                <Message message='Hi' />
                <Message message='How is your learning?' />
                <Message message='React is the best!' />
            </div>
        </div>
    );
}

export default Dialogs;