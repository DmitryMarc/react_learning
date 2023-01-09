import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setMessagesWithUserThunkCreator } from '../../../Redux/dialogs-reducer';
import { AppDispatchType } from '../../../Redux/redux-store';
import styles from './../Dialogs.module.css';

type DialogItemPropsType = {
    id: number,
    name: string,
    photo: string | null
}

const DialogItem: FC<DialogItemPropsType> = (props) => {
    const dispatch: AppDispatchType = useDispatch();
    const onClickHandler = () => {
        dispatch(setMessagesWithUserThunkCreator(props.id));
    }
    return (
        <div className={styles.dialog + ' ' + styles.active}>
            <NavLink onClick={onClickHandler} to={'/dialogs/' + props.id + '/messages'}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItem;