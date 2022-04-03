
import classes from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div>
                <div>
                    <img src='https://www.anypics.ru/download.php?file=201211/1280x800/anypics.ru-34518.jpg' />
                </div>
                <div className={classes.descriptionBlock}>
                    ava + description
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;