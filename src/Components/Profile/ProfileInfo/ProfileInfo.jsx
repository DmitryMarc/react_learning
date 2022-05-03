import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
    if(!props.profile){
        return <Preloader />
    }

    return (
        <div>
            <div>
                <div>
                    <img src='https://widewp.ru/images/nature/199.jpg' />
                </div>
                <div className={classes.descriptionBlock}>
                    <img src={props.profile.photos.small} />
                    ava + description
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;