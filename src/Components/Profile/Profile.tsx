import { FC } from 'react';
import { ProfileType } from '../../types/types';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

type PropsType = {
    profile: ProfileType | null,
    status: string, 
    isOwner: boolean, 
    updateStatus: (status:string) => void, 
    savePhoto: (file:File) => void, 
    saveProfile: (profile: ProfileType) => Promise<any> 
}

const Profile:FC<PropsType> = (props) => {
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



