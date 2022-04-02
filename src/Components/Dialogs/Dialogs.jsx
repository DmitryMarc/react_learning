import classes from './Dialogs.module.css'

const Dialogs =  (props) => {
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                <div className={classes.dialog + ' ' + classes.active}>
                    Dmitry
                </div>
                <div className={classes.dialog}>
                    Andrey
                </div>
                <div className={classes.dialog}>
                    Sveta
                </div>
                <div className={classes.dialog}>
                    Sasha
                </div>
                <div className={classes.dialog}>
                    Victor
                </div>
                <div className={classes.dialog}>
                    Valery
                </div>
            </div>
            <div className={classes.messages}>
                <div className={classes.dialog}>Hi</div>
                <div className={classes.dialog}>How is your learning?</div>
                <div className={classes.dialog}>React is the best!</div>
            </div>
        </div>
    );
}

export default Dialogs;