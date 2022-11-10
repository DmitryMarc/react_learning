import { connect } from 'react-redux';
import {
    follow, unfollow, setCurrentPageActionCreator,
    toggleFollowingProgressActionCreator,
    requestUsersThunkCreator
} from '../../Redux/users-reducer';
import React from 'react';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import {
    getCurrentPage, getFollowingInProgress,
    getIsFetching, getPageSize, getTotalUsersCount,
    getUsers
} from '../../Redux/users-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../Redux/redux-store';

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    users: Array<UserType>,
    followingInProgress: Array<number>
}

type MapDispatchPropsType = {
    getUsers: (currentPage:number, pageSize:number) => void,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
    // setCurrentPage: () => void,
    // toggleFollowingProgress: () => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber:number) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize} currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged} users={this.props.users}
                follow={this.props.follow} unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress} />
        </>
    }
}

let mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        users: getUsers(state), //state.usersPage.users если бы не использовали селекторы
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    //TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState // Обязательно соблюдать сигнатуру и порядок типов!
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {
            //followyo: follow, пройдёт без ошибок
            follow,
            unfollow,
            // setCurrentPage: setCurrentPageActionCreator,
            // toggleFollowingProgress: toggleFollowingProgressActionCreator,
            getUsers: requestUsersThunkCreator
        })
)(UsersContainer);



