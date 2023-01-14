import { FC } from 'react';
import userPhoto from '../../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { followTC, unfollowTC } from '../../../Redux/users-reducer';
import { AppDispatchType } from '../../../Redux/redux-store';
import { getFollowingInProgress } from '../../../Redux/selectors/users-selectors';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons'
import styles from './User.module.css'

type UserPropsType = {
    user: UserType
}

const User: FC<UserPropsType> = ({ user }) => {
    const followingInProgress = useSelector(getFollowingInProgress);
    const dispatch: AppDispatchType = useDispatch();

    return (
        <div className={styles.userContainer}>
            <span className={styles.userContent}>
                <span>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null
                            ? user.photos.small
                            : userPhoto} className={styles.userPhoto} />
                    </NavLink>
                </span>
                <span>
                    <div className={styles.userInformation}>
                        <span>
                            <span>{user.name}</span>
                            <span>{user.status}</span>
                        </span>
                        <span>
                            <div>{"user.location.country"}</div>
                            <div>{"user.location.city"}</div>
                        </span>
                    </div>
                </span>
            </span>
            <div>
                {user.followed
                    ? <button className={styles.userFollowUnfollowBtn}
                        disabled={followingInProgress.some(id =>
                            id === user.id)} onClick={() => {
                                dispatch(unfollowTC(user.id));
                            }}>Unfollow <CheckOutlined /></button>
                    : <button className={styles.userFollowUnfollowBtn}
                        disabled={followingInProgress.some(id =>
                            id === user.id)} onClick={() => {
                                dispatch(followTC(user.id));
                            }}>Follow <PlusOutlined /></button>
                }
            </div>
        </div>
    )
}

export default User;
