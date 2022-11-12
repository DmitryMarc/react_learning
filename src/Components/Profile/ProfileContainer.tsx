import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import {
    getStatusThunkCreator, 
    getUserProfileThunkCreator,
    savePhotoThunkCreator,
    saveProfileThunkCreator,
    updateStatusThunkCreator
} from '../../Redux/profile-reducer';
import { compose } from 'redux';
import { AppStateType } from '../../Redux/redux-store';
import { ProfileType } from '../../types/types';

type MapStatePropsType = {
    profile: ProfileType | null,
    status: string,
    authorizedUserId: any,
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId:number) => void,
    getStatus: (userId:number) => void,
    updateStatus: (status: string) => void,
    savePhoto: (file:any) => void,
    saveProfile: (profile:ProfileType) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

class ProfileContainer extends React.Component<PropsType> {
    refreshProfile() {
        // @ts-ignore
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId; //Мой профиль!!!
            if (!userId) {
                // @ts-ignore
                this.props.history.push("/login");
                //редирект на логин, если нет id юзера (мой id)
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps:PropsType) {
        // @ts-ignore
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            // @ts-ignore
            <Profile {...this.props} isOwner={this.props.match.params.userId == this.props.authorizedUserId} profile={this.props.profile}
                status={this.props.status} updateStatus={this.props.updateStatus} savePhoto={this.props.savePhoto} />
        );
    }
}

let mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps,
        {
            getUserProfile: getUserProfileThunkCreator,
            getStatus: getStatusThunkCreator,
            updateStatus: updateStatusThunkCreator,
            savePhoto: savePhotoThunkCreator,
            saveProfile: saveProfileThunkCreator
        }),
    withRouter
)(ProfileContainer);




