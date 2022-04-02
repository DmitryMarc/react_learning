import classes from  './Side-bar.module.css';

const SideBar = () => {
    return (
        <nav className={classes.side__bar}>
            <ul>
                <li className={classes.item}><a className={classes.active} href='/profile'>Ptofile</a></li>
                <li className={classes.item}><a href='/dialogs'>Messages</a></li>
                <li className={classes.item}><a href='/news'>News</a></li>
                <li className={classes.item}><a href='/music'>Music</a></li>
                <li className={classes.item}><a href='/settings'>Settings</a></li>
            </ul>
        </nav>
    );
}

export default SideBar;