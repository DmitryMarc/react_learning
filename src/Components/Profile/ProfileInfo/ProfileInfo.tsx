import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import ProfileDataForm from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/types';
import { savePhotoThunkCreator, saveProfileThunkCreator } from '../../../Redux/profile-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType } from '../../../Redux/redux-store';
import { selectProfile } from '../../../Redux/selectors/profile-selectors';
import { UploadOutlined } from '@ant-design/icons';
import styles from './ProfileInfo.module.css'
import { EditOutlined } from '@ant-design/icons'

type ProfileInfoPropsType = {
    isOwner: boolean,
}

const ProfileInfo: FC<ProfileInfoPropsType> = ({ isOwner }) => {
    let profile = useSelector(selectProfile);
    let [editMode, setEditMode] = useState(false);
    let dispatch: AppDispatchType = useDispatch();
    // Нельзя так использовать, т.к. ниже есть хук
    // if (!profile) {
    //     return <Preloader />
    // }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(savePhotoThunkCreator(e.target.files[0]));
        }
    }
    const onSubmit = (formData: ProfileType) => {
        dispatch(saveProfileThunkCreator(formData));
    }

    useEffect(() => {
        // закрываем редактирование, когда приходит профиль
        setEditMode(false);
    }, [profile])

    return (
        <div>
            {!profile ? <Preloader /> :
                <div>
                    <div className={styles.descriptionBlock}>
                        <div className={styles.photo}>
                        <img src={profile.photos.small || userPhoto}
                            className={styles.mainPhoto} />
                        {/* {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />} */}
                        {isOwner && 
                            <label className={styles.uploadIconWrapper}>
                                <input name="file" type="file" className={styles.uploadFile} onChange={onMainPhotoSelected} />
                                <span className={styles.uploadIconWrapper}><UploadOutlined className={styles.uploadIcon} /></span>
                            </label>
                        }
                        </div>

                        {editMode
                            ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                            : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />
                        }

                        {/* <ProfileStatusWithHooks /> */}
                    </div>
                </div>
            }
        </div>
    );
}

type ProfileDataPropsType = {
    profile: ProfileType,
    isOwner: boolean,
    goToEditMode: () => void
}

const ProfileData: FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
    if (!isOwner) {
        return <Preloader />
    }
    return (
        <div className={styles.profileInformation}>
            <div className={styles.item1}>
                <h3>{profile.fullName}</h3>
            </div>
            {isOwner &&
            <span className={styles.editProfileBtnWrapper}>
                edit profile <button className={styles.editProfileBtn} onClick={goToEditMode}><EditOutlined /></button>
            </span>
            }
            <ProfileStatusWithHooks />
            <hr/>
            <div>
                <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {profile.lookingForAJob &&
                <div>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me:</b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <Contact contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
                })}
            </div>
        </div>
    )
}

type ContactType = {
    contactTitle: string,
    contactValue: string
}

const Contact: FC<ContactType> = ({ contactTitle, contactValue }) => {
    return <div className={styles.contact}><b>{contactTitle}:</b> {contactValue}</div>
}

export default ProfileInfo;



