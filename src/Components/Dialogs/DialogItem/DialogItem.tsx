import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './../Dialogs.module.css';

type DialogItemPropsType = {
    id: number,
    name: string
}

const DialogItem: FC<DialogItemPropsType> = (props) => {
    return (
        <div className={classes.dialog + ' ' + classes.active}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItem;