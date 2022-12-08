import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppDispatchType } from '../../Redux/redux-store';
import { FilterType, requestUsersThunkCreator, followTC, unfollowTC } from '../../Redux/users-reducer';
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsersFilter, getUsers, getFollowingInProgress } from '../../Redux/users-selectors';
import Paginator from '../common/Paginator/Paginator';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';
import * as queryString from 'querystring';

type PropsType = {}

type QueryParamsType = { term?: string, page?: string, friend?: string }

export const Users: FC<PropsType> = (props) => {
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch: AppDispatchType = useDispatch();
    const history = useHistory();

    //Первое монтирование
    useEffect(() => {
        // debugger;
        // тоже самое, что и: const search = history.location.search;
        //const {search} = history.location;
        const parsed = queryString.parse(history.location.search.substring(1)) as QueryParamsType;

        let actualPage = currentPage;
        let actualFilter = filter;

        if (parsed.page) {
            actualPage = +parsed.page;
        }

        if (parsed.term) {
            actualFilter = { ...actualFilter, term: parsed.term as string };
        }

        switch (parsed.friend) {
            case "null":
                actualFilter = { ...actualFilter, friend: null };
                break;
            case "null":
                actualFilter = { ...actualFilter, friend: null };
                break;
            case "null":
                actualFilter = { ...actualFilter, friend: null };
                break;
        }
        // Таже саное, что и сверху через switch
        // if (parsed.friend) {
        //     actualFilter = { ...actualFilter, friend: parsed.friend === "null" ? null : parsed.friend === "true" ? true : false };
        // }

        dispatch(requestUsersThunkCreator(actualPage, pageSize, actualFilter))
    }, []);

    useEffect(() => {
        // debugger;
        const query: QueryParamsType = {};
        if (!!filter.term) {
            query.term = filter.term;
        }
        if (filter.friend !== null) {
            query.friend = String(filter.friend);
        }

        if (currentPage !== 1) {
            query.page = String(currentPage);
        }

        history.push({
            pathname: "/users",
            // search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
            search: queryString.stringify(query)
        })
    }, [filter, currentPage]);

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsersThunkCreator(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsersThunkCreator(1, pageSize, filter));
    }

    const follow = (userId: number) => {
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


