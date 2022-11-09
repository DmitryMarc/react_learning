import React, { FC } from 'react';
import { UserType } from '../../types/types';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

type PropsType = { 
    currentPage: number, 
    totalUsersCount: number, 
    pageSize: number, 
    onPageChanged: (pageNumber: number) => void,
    users: Array<UserType>,
    followingInProgress: Array<number>, //узнать почему такой тип!!!
    unfollow: (userId:number) => void,
    follow: (userId:number) => void
}

let Users:FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount} pageSize={pageSize} />
        {/* <div>
            {pages.map(page => {
                return <span className={props.currentPage === page 
                    && classes.selectedPage} onClick={() => 
                        { props.onPageChanged(page) }}>{page}</span>;
            })}
        </div> */}
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

