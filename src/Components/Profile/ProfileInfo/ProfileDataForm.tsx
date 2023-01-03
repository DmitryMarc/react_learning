import classes from './ProfileInfo.module.css';
import style from "../../common/FormsControls/FormsControls.module.css";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, GetStringKeysType, Input, Textarea } from "../../common/FormsControls/FormsControls";
import { FC } from 'react';
import { ProfileType } from '../../../types/types';
import stylesInfo from './ProfileInfo.module.css'

type ProfileDataFormPropsType = {
    profile: ProfileType
}

type ProfileTypeKeys = GetStringKeysType<ProfileType>;

const ProfileDataForm: FC<InjectedFormProps<ProfileType, ProfileDataFormPropsType> & ProfileDataFormPropsType> = 
({ handleSubmit, profile, error }) => {
    return (
        <form onSubmit={handleSubmit} className={stylesInfo.profileInformation}>
            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <b>Full name:</b> {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
            </div>
            <div>
                <b>Looking for a job:</b>
                {createField<ProfileTypeKeys>("", "lookingForAJob", [], Input, { type: "checkbox" })}
            </div>
            <div>
                <b>My professional skills:</b>
                {createField<ProfileTypeKeys>("My professional skills", "lookingForAJobDescription", [], Textarea)}
            </div>
            <div>
                <b>About me:</b>
                {createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return (
                        <div key={key} className={classes.contact}>
                            {/* todo: create some solution for embedded objects */}
                            <b>{key}:</b> {createField(key, "contacts." + key, [], Input)}
                        </div>
                    )
                })}
            </div>
            <div>
                <button onClick={() => { }}>save</button>
            </div>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm<ProfileType, ProfileDataFormPropsType>({ form: 'edit-profile' })(ProfileDataForm);

export default ProfileDataReduxForm;