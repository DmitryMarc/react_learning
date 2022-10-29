import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto}) => {
    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length){
            savePhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div>
                <div className={classes.descriptionBlock}>
                    <img src={profile.photos.small || userPhoto} 
                    className={classes.mainPhoto} />
                    {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
                    <ProfileStatusWithHooks status={status}
                        updateStatus={updateStatus} /> 
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;



