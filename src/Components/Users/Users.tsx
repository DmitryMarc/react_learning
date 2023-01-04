import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppDispatchType } from '../../Redux/redux-store';
import { actionCreators, FilterType, requestUsersThunkCreator }
    from '../../Redux/users-reducer';
import {
    getCurrentPage, getPageSize,
    getTotalUsersCount, getUsersFilter,
    getUsers, getIsFetching
} from '../../Redux/selectors/users-selectors';
import Paginator from '../common/Paginator/Paginator';
import User from './User/User';
import { UsersSearchForm } from './UsersSearchForm';
import * as queryString from 'querystring';
import Preloader from '../common/Preloader/Preloader';
import { Pagination } from 'antd';

type PropsType = {
    pageTitle: string
}

type QueryParamsType = { term?: string, page?: string, friend?: string }

export const Users: FC<PropsType> = (props) => {
    const users = useSelector(getUsers);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const isFetching = useSelector(getIsFetching);

    const dispatch: AppDispatchType = useDispatch();
    const history = useHistory();

    //Первое монтирование
    useEffect(() => {
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
            case "true":
                actualFilter = { ...actualFilter, friend: true };
                break;
            case "false":
                actualFilter = { ...actualFilter, friend: false };
                break;
        }

        dispatch(requestUsersThunkCreator(actualPage, pageSize, actualFilter))
    }, []);

    useEffect(() => {
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
            pathname: "/developers",
            search: queryString.stringify(query)
        })
    }, [filter, currentPage]);

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsersThunkCreator(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsersThunkCreator(1, pageSize, filter));
    }

    const onShowSizeChange = (pageNumber: number, pageSize: number) => {
        dispatch(actionCreators.setPageSizeActionCreator(pageSize));
        dispatch(requestUsersThunkCreator(pageNumber, pageSize, filter));
    }
    useEffect(() => {
        dispatch(requestUsersThunkCreator(currentPage, pageSize, filter));
    }, [currentPage, pageSize])
    
    return (
        <div>
            <h2>{props.pageTitle}</h2>
            {isFetching ? <Preloader /> :
                <>
                    <UsersSearchForm onFilterChanged={onFilterChanged} />
                    {users.length > 0 &&
                        <Pagination defaultCurrent={1} current={currentPage} total={totalUsersCount}
                            onChange={onPageChanged} pageSize={pageSize} onShowSizeChange={onShowSizeChange}
                            pageSizeOptions={[5, 10, 20, 50, 100]} style={{ margin: '20px 0' }} size={'small'} />
                    }
                    {/* <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                        totalItemsCount={totalUsersCount} pageSize={pageSize} /> */}
                    <div>
                        {
                            users.map(user => <User user={user} key={user.id} />)
                        }
                    </div>
                    {pageSize > 5 && users.length > 0 &&
                        <Pagination defaultCurrent={1} current={currentPage} total={totalUsersCount}
                            onChange={onPageChanged} pageSize={pageSize} onShowSizeChange={onShowSizeChange}
                            pageSizeOptions={[5, 10, 20, 50, 100]} style={{ margin: '30px 0 0 0' }} size={'small'} />
                    }
                </>
            }
        </div>
    )
}
