import { useSelector } from 'react-redux';
import { FC } from 'react';
import { Users } from './Users';
import Preloader from '../common/Preloader/Preloader';
import { getIsFetching } from '../../Redux/users-selectors';

type UsersPagePropsType = {
    pageTitle: string
}

export const UsersPage: FC<UsersPagePropsType> = (props) => {
    const isFetching = useSelector(getIsFetching);
    return <>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}



