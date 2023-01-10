import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setMessagesWithUserThunkCreator } from '../../../Redux/dialogs-reducer';
import { AppDispatchType } from '../../../Redux/redux-store';
import styles from './../Dialogs.module.css';
import userPhoto from '../../../../src/assets/images/user.png';

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
            <NavLink onClick={onClickHandler} to={'/dialogs/' + props.id + '/messages'}>
                <div>
                    {props.photo
                        ? <img src={props.photo} alt='userPhoto' style={{ width: '35px', borderRadius:'50%'}}></img>
                        : <img src={userPhoto} alt='userPhoto' width='35px'></img>
                    } 
                    <span> {props.name}</span>
                </div>
            </NavLink>
        </div>
    );
}

export default DialogItem;