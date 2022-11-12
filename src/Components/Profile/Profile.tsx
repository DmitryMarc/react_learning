import { FC } from 'react';
import { ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsTypes = {
    isOwner: boolean,
    profile: ProfileType,
    status: string,
    savePhoto: (file:any) => void,
    saveProfile: (profile:ProfileType) => void,
    updateStatus: (status:string) => void
}

const Profile:FC<PropsTypes> = (props) => {
    return (
        <div>
            <ProfileInfo savePhoto={props.savePhoto}
                isOwner={props.isOwner}
                profile={props.profile} status={props.status} 
                saveProfile={props.saveProfile}
                updateStatus={props.updateStatus} />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;



