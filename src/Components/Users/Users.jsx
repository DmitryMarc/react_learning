import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount} pageSize={pageSize} />
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

