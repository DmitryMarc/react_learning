import { FC } from 'react';
import { FilterType } from '../../Redux/users-reducer';
import { UserType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';

type PropsType = {
    currentPage: number,
    totalUsersCount: number,
    pageSize: number,
    onPageChanged: (pageNumber: number) => void,
    onFilterChanged: (filter: FilterType) => void,
    users: Array<UserType>,
    followingInProgress: Array<number>, //узнать почему такой тип!!!
    unfollow: (userId: number) => void,
    follow: (userId: number) => void
}

let Users: FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
    return <div>

        <UsersSearchForm onFilterChanged={props.onFilterChanged} />

        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount} pageSize={pageSize} />
        <div>
            {
                users.map(user => <User user={user} key={user.id}
                    followingInProgress={props.followingInProgress} unfollow={props.unfollow}
                    follow={props.follow} />)
            }
        </div>
    </div>
}

export default Users;

