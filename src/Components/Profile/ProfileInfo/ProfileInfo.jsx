import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
//import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile) {
        return <Preloader />
    }

    return (
        <div>
            <div>
                <div className={classes.descriptionBlock}>
                    <img src={profile.photos.small} />
                    <ProfileStatusWithHooks status={status}
                        updateStatus={updateStatus} />
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;



