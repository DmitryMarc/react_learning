import style from "../../common/FormsControls/FormsControls.module.css";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, GetStringKeysType, Input, Textarea }
    from "../../common/FormsControls/FormsControls";
import { Dispatch, FC, SetStateAction } from 'react';
import { ProfileType } from '../../../types/types';
import stylesInfo from './ProfileInfo.module.css';
import stylesDataForm from './ProfileDataForm.module.css';
import { Button } from "antd";

type ProfileDataFormPropsType = {
    profile: ProfileType
    setIsContacts: Dispatch<SetStateAction<boolean>>
}

type ProfileTypeKeys = GetStringKeysType<ProfileType>;

const ProfileDataForm: FC<InjectedFormProps<ProfileType, ProfileDataFormPropsType>
    & ProfileDataFormPropsType> =
    ({ handleSubmit, profile, error, setIsContacts }) => {
        return (
            <form onSubmit={handleSubmit} className={stylesInfo.profileInformation}>
                {error && <div className={style.formSummaryError}>
                    {error}
                </div>
                }
                <div className={stylesInfo.informationItem}>
                    <b className={stylesInfo.informationTitleItem}>Full name:</b>
                    {createField<ProfileTypeKeys>("Full name", "fullName", [], Input)}
                </div>
                <div className={stylesInfo.informationItem}>
                    <b className={stylesInfo.informationTitleItem}>Looking for a job: </b>
                    <div className={stylesDataForm.lookingForAJobCheckbox}>
                        {createField<ProfileTypeKeys>("", "lookingForAJob", [],
                            Input, { type: "checkbox" })}
                    </div>
                </div>
                <div className={stylesInfo.informationItem}>
                    <b className={stylesInfo.informationTitleItem}>My professional skills:</b>
                    {createField<ProfileTypeKeys>("My professional skills",
                        "lookingForAJobDescription", [], Textarea)}
                </div>
                <div className={stylesInfo.informationItem}>
                    <b className={stylesInfo.informationTitleItem}>About me:</b>
                    {createField<ProfileTypeKeys>("About me", "aboutMe", [], Textarea)}
                </div>
                <div className={stylesDataForm.contactsFormWrapper}>
                    <b className={stylesInfo.informationTitleItem}>Contacts:</b>
                    {Object.keys(profile.contacts).map(key => {
                        return (
                            <div key={key} className={stylesInfo.contact}>
                                {/* todo: create some solution for embedded objects */}
                                <b>{key}:</b> {createField(key, "contacts." + key, [], Input)}
                            </div>
                        )
                    })}
                </div>
                <div>
                    <Button htmlType="submit" onClick={() => {
                        //если данные контактов есть
                        if (profile.contacts) {
                            setIsContacts(true)
                        }
                    }} style={{ float: "right" }}>Save</Button>
                </div>
            </form>
        )
    }

const ProfileDataReduxForm = reduxForm<ProfileType, ProfileDataFormPropsType>(
    { form: 'edit-profile' })(ProfileDataForm);

export default ProfileDataReduxForm;