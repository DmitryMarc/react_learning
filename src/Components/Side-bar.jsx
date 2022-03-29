import classes from  './Side-bar.module.css';

const SideBar = () => {
    return (
        <nav className={classes.side__bar}>
            <ul>
                <li className={classes.item}><a href='#'>Ptofile</a></li>
                <li className={classes.item}><a href='#'>Messages</a></li>
                <li className={classes.item}><a href='#'>News</a></li>
                <li className={classes.item}><a href='#'>Music</a></li>
                <li className={classes.item}><a href='#'>Settings</a></li>
            </ul>
        </nav>
    );
}

export default SideBar;