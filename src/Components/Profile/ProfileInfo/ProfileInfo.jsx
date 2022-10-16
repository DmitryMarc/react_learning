import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div>
                {/* <div>
                    <img src='https://widewp.ru/images/nature/199.jpg' />
                </div> */}
                <div className={classes.descriptionBlock}>
                    <img src={props.profile.photos.small} />
                    <ProfileStatusWithHooks status={props.status}
                        updateStatus={props.updateStatus} />
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;



