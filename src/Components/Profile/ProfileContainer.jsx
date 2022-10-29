import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import {
    getStatusThunkCreator, 
    getUserProfileThunkCreator,
    savePhotoThunkCreator,
    updateStatusThunkCreator
} from '../../Redux/profile-reducer';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId; //Мой профиль!!!
            if (!userId) {
                this.props.history.push("/login");
                //редирект на логин, если нет id юзера (мой id)
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        debugger;
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState) {
        debugger;
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props} isOwner={this.props.match.params.userId == this.props.authorizedUserId} profile={this.props.profile}
                status={this.props.status} updateStatus={this.props.updateStatus} savePhoto={this.props.savePhoto} />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps,
        {
            getUserProfile: getUserProfileThunkCreator,
            getStatus: getStatusThunkCreator,
            updateStatus: updateStatusThunkCreator,
            savePhoto: savePhotoThunkCreator
        }),
    withRouter
)(ProfileContainer);




