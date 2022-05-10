import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = (props) => {
    return (
    <header className = {classes.header}>
        <img width="300" src="https://ves-rf.ru/sites/default/files/article-img/20171214/6.jpg" />

        <div className={classes.loginBlock}>
            {props.isAuth ? props.login :
            <NavLink to={'/login'}>Login</NavLink>}
        </div>
    </header>
    );
}

export default Header;