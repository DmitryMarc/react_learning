import Preloader from '../../common/Preloader/Preloader';
import userPhoto from '../../../assets/images/user.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import {
    ChangeEvent, Dispatch, FC, SetStateAction,
    useEffect, useState
} from 'react';
import ProfileDataForm from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/types';
import { savePhotoThunkCreator, saveProfileThunkCreator }
    from '../../../Redux/profile-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType } from '../../../Redux/redux-store';
import { selectProfile } from '../../../Redux/selectors/profile-selectors';
import { UploadOutlined } from '@ant-design/icons';
import styles from './ProfileInfo.module.css';
import { EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { addNewDialogThunkCreator, setMessagesWithUserThunkCreator }
    from '../../../Redux/dialogs-reducer';

type ProfileInfoPropsType = {
    isOwner: boolean,
}

const ProfileInfo: FC<ProfileInfoPropsType> = ({ isOwner }) => {
    // Для отображения состояния контактов (вынесли сюда, чтобы работать с двумя дочерними компонентами)
    const [isContacts, setIsContacts] = useState<boolean>(false);
    const profile = useSelector(selectProfile);
    const [editMode, setEditMode] = useState(false);
    const dispatch: AppDispatchType = useDispatch();

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

    if (!profile) {
        return <Preloader />
    }
    return (
        <div>
            <div className={styles.descriptionBlock}>
                <div className={styles.photo}>
                    <img src={profile.photos.small || userPhoto}
                        className={styles.mainPhoto} />
                    {isOwner &&
                        <label className={styles.uploadIconWrapper}>
                            <input name="file" type="file" className={styles.uploadFile}
                                onChange={onMainPhotoSelected} />
                            <span className={styles.uploadIconWrapper}><UploadOutlined
                                className={styles.uploadIcon} /></span>
                        </label>
                    }
                </div>
                {editMode
                    ? <ProfileDataForm initialValues={profile}
                        profile={profile} onSubmit={onSubmit} setIsContacts={setIsContacts} />
                    : <ProfileData profile={profile} isOwner={isOwner}
                        goToEditMode={() => { setEditMode(true) }}
                        isContacts={isContacts} setIsContacts={setIsContacts} />
                }
            </div>
        </div>
    );
}

type ProfileDataPropsType = {
    isContacts: boolean
    profile: ProfileType,
    isOwner: boolean,
    goToEditMode: () => void,
    setIsContacts: Dispatch<SetStateAction<boolean>>
}

const ProfileData: FC<ProfileDataPropsType> = ({ profile, isOwner,
    goToEditMode, isContacts, setIsContacts }) => {
    const dispatch: AppDispatchType = useDispatch();
    const params: { userId: string } = useParams();
    const history = useHistory();

    // Чтобы "обнулялся" state при вымонтировании компонента (аналог componentWillUnmount)
    useEffect(() => {
        return setIsContacts(false);
    }, [])

    const onClickHandler = () => {
        dispatch(addNewDialogThunkCreator(+params.userId));
        history.push(`/dialogs/${+params.userId}/messages`);
        dispatch(setMessagesWithUserThunkCreator(+params.userId));
    }

    return (
        <div className={styles.profileInformation}>
            <div className={styles.fullName}>
                <h3>{profile.fullName}</h3>
            </div>
            {isOwner &&
                <span className={styles.editProfileBtnWrapper}>
                    edit profile <button className={styles.editProfileBtn}
                        onClick={goToEditMode}><EditOutlined /></button>
                </span>
            }
            <ProfileStatusWithHooks isOwner={isOwner} />
            <hr />
            <div className={styles.informationItem}>
                <b>Looking for a job:</b> {profile.lookingForAJob ? "yes" : "no"}
            </div>
            {profile.lookingForAJob &&
                <div className={styles.informationItem}>
                    <b>My professional skills:</b> {profile.lookingForAJobDescription}
                </div>
            }
            <div className={styles.informationItem}>
                <b>About me:</b> {profile.aboutMe}
                {!profile.aboutMe && "-----"}
            </div>
            <div className={styles.informationItem}>
                <b>Contacts:</b> {!isContacts && "-----"}
                {Object.keys(profile.contacts).map(key => {
                    return <Contact setIsContacts={setIsContacts} contactTitle={key}
                        contactValue={profile.contacts[key as keyof ContactsType]} />
                })}
            </div>
            {!isOwner &&
                <div className={styles.informationItem}>
                    <Button onClick={onClickHandler}>Write message</Button>
                </div>
            }
        </div>
    )
}

type ContactType = {
    contactTitle: string,
    contactValue: string
    setIsContacts: Dispatch<SetStateAction<boolean>>
}

const Contact: FC<ContactType> = ({ contactTitle, contactValue, setIsContacts }) => {
    if (!contactValue) {
        return null;
    } else {
        setIsContacts(true);
    }
    return (
        <div className={styles.contact}>
            <b className={styles.contactTitle}>{contactTitle}:</b> {contactValue}
        </div>
    )
}

export default ProfileInfo;
