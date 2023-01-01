import { FC } from 'react';
import classes from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { followTC, unfollowTC } from '../../Redux/users-reducer';
import { AppDispatchType } from '../../Redux/redux-store';
import { getFollowingInProgress } from '../../Redux/selectors/users-selectors';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons'

type UserPropsType = {
    user: UserType
}

const User: FC<UserPropsType> = ({ user }) => {
    const followingInProgress = useSelector(getFollowingInProgress);
    const dispatch: AppDispatchType = useDispatch();

    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null
                            ? user.photos.small
                            : userPhoto} className={classes.userPhoto} />
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress.some(id =>
                            id === user.id)} onClick={() => {
                                dispatch(unfollowTC(user.id));
                            }}>Unfollow <CheckOutlined /></button>
                        : <button disabled={followingInProgress.some(id =>
                            id === user.id)} onClick={() => {
                                dispatch(followTC(user.id));
                            }}>Follow <PlusOutlined /></button>
                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </span>
            </span>
        </div>
    )
}

export default User;

