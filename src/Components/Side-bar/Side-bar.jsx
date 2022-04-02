import { NavLink } from 'react-router-dom';
import classes from  './Side-bar.module.css';

const SideBar = () => {
    return (
        <nav className={classes.side__bar}>
            <ul>
                <li className={classes.item}><NavLink to='/profile' className = {navData => navData.isActive ? classes.activeLink : ''}>Ptofile</NavLink></li>
                <li className={classes.item}><NavLink to='/dialogs' className = {navData => navData.isActive ? classes.activeLink : ''}>Messages</NavLink></li>
                <li className={classes.item}><NavLink to='/news' className = {navData => navData.isActive ? classes.activeLink : ''}>News</NavLink></li>
                <li className={classes.item}><NavLink to='/music' className = {navData => navData.isActive ? classes.activeLink : ''}>Music</NavLink></li>
                <li className={classes.item}><NavLink to='/settings' className = {navData => navData.isActive ? classes.activeLink : ''}>Settings</NavLink></li>
            </ul>
        </nav>
    );
}

export default SideBar;