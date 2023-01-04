import { useState, useEffect, FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatusThunkCreator } from '../../../Redux/profile-reducer';
import { AppDispatchType } from '../../../Redux/redux-store';
import { selectStatus } from '../../../Redux/selectors/profile-selectors';
import styles from './ProfileInfo.module.css';

const ProfileStatusWithHooks: FC = () => {
    let globalStatus = useSelector(selectStatus);
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(globalStatus);
    let dispatch: AppDispatchType = useDispatch();

    useEffect(() => {
        setStatus(globalStatus);
        setEditMode(false);
    }, [globalStatus])

    const activateEditMode = () => {
        setEditMode(true);
    }
    const deactivateEditMode = () => {
        // setEditMode(false);
        dispatch(updateStatusThunkCreator(status));
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }
    
    return (
        <div>
            {!editMode &&
                <div>
                    <b className={styles.informationItem}>Status:</b> <span onDoubleClick={activateEditMode}>
                        {globalStatus || "-----"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange}
                        autoFocus={true} onBlur={deactivateEditMode}
                        value={status}></input>
                </div>
            }
        </div>
    );
}

export default ProfileStatusWithHooks;