import { NavLink } from 'react-router-dom';
import classes from  './Side-bar.module.css';

const setActive = (newData) => newData.isActive ? classes.activeLink : '';

const SideBar = () => {
    return (
        <nav className={classes.side__bar}>
            <ul>
                <li className={classes.item}><NavLink to='/profile' className = {setActive}>Ptofile</NavLink></li>
                <li className={classes.item}><NavLink to='/dialogs' className = {setActive}>Messages</NavLink></li>
                <li className={classes.item}><NavLink to='/news' className = {setActive}>News</NavLink></li>
                <li className={classes.item}><NavLink to='/music' className = {setActive}>Music</NavLink></li>
                <li className={classes.item}><NavLink to='/settings' className = {setActive}>Settings</NavLink></li>
            </ul>
        </nav>
    );
}

export default SideBar;