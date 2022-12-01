import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

type PropsType = {
    isAuth: boolean,
    login: string | null,
    logout: () => void
}

const Header:FC<PropsType> = (props) => {
    return (
        <header className={classes.header}>
            <img width="300" src="https://ves-rf.ru/sites/default/files/article-img/20171214/6.jpg" />

            <div className={classes.loginBlock}>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;

