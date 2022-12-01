import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classes from  './Side-bar.module.css';

const setActive = (newData:any) => newData.isActive ? classes.activeLink : '';

const SideBar: FC = () => {
    return (
        <nav className={classes.side__bar}>
            <ul>
                {/* Временный костыль. Почему-то не перерисовывается при переходе на свой профиль! */}
                <li className={classes.item}><NavLink to='/profile/23977' className = {setActive}>Ptofile</NavLink></li>
                <li className={classes.item}><NavLink to='/dialogs' className = {setActive}>Messages</NavLink></li>
                <li className={classes.item}><NavLink to='/users' className = {setActive}>Users</NavLink></li>
                <li className={classes.item}><NavLink to='/news' className = {setActive}>News</NavLink></li>
                <li className={classes.item}><NavLink to='/music' className = {setActive}>Music</NavLink></li>
                <li className={classes.item}><NavLink to='/settings' className = {setActive}>Settings</NavLink></li>
            </ul>
        </nav>
    );
}

export default SideBar;