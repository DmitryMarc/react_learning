import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { ChangeEvent, FC, useState } from 'react';
import ProfileDataForm from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/types';

type ProfileInfoPropsType = { 
    profile: ProfileType | null,
    status: string, 
    isOwner: boolean, 
    updateStatus: (status:string) => void, 
    savePhoto: (file:File) => void, 
    saveProfile: (profile: ProfileType) => Promise<any> 
}

const ProfileInfo:FC<ProfileInfoPropsType> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    }
    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        saveProfile(formData).then(() => { 
        //ждём из промиса (promise.then(...))
            setEditMode(false);
        })
    }

    return (
        <div>
            <div>
                <div className={classes.descriptionBlock}>
                    <img src={profile.photos.small || userPhoto}
                        className={classes.mainPhoto} />
                    {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

                    {editMode
                        ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                        : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />
                    }

                    <ProfileStatusWithHooks status={status}
                        updateStatus={updateStatus} />
                </div>
            </div>
        </div>
    );
}

type ProfileDataPropsType = {
    profile: ProfileType, 
    isOwner: boolean, 
    goToEditMode: () => void
}

const ProfileData:FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {
    return (
        <div>
            {isOwner &&
                <div>
                    <button onClick={goToEditMode}>edit</button>
                </div>
            }
            <div>
                <b>Full name:</b> {profile.fullName}
            </div>
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

const Contact:FC<ContactType> = ({ contactTitle, contactValue }) => {
    return <div className={classes.contact}><b>{contactTitle}:</b> {contactValue}</div>
}

export default ProfileInfo;



