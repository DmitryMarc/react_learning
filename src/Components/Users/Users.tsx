import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType } from '../../Redux/redux-store';
import { FilterType, requestUsersThunkCreator, followTC, unfollowTC } from '../../Redux/users-reducer';
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsersFilter, getUsers, getFollowingInProgress } from '../../Redux/users-selectors';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';

type PropsType = {}

export const Users: FC<PropsType> = (props) => {
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch: AppDispatchType = useDispatch();

    useEffect(()=>{
        dispatch(requestUsersThunkCreator(currentPage,pageSize,filter))
    }, []);

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsersThunkCreator(pageNumber, pageSize, filter)); 
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsersThunkCreator(1, pageSize, filter));
    }

    const follow = (userId:number) => {
        dispatch(followTC(userId));
    }

    const unfollow = (userId: number) => {
        dispatch(unfollowTC(userId));
    }

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged} />

        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount} pageSize={pageSize} />
        <div>
            {
                users.map(user => <User user={user} key={user.id}
                    followingInProgress={followingInProgress} unfollow={unfollow}
                    follow={follow} />)
            }
        </div>
    </div>
}


