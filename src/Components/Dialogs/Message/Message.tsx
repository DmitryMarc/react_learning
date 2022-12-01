import { FC } from 'react';
import classes from './../Dialogs.module.css';

type MessagePropsType = {
    message: string
}

const Message: FC<MessagePropsType> = (props) => {
    return (
        <div className={classes.dialog}>{props.message}</div>
    );
}

export default Message;