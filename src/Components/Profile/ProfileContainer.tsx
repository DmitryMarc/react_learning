import { Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { RouteComponentProps, withRouter } from 'react-router-dom';
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

type MapStatePropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
    getUserProfile: (userId:number) => void,
    getStatus: (userId:number) => void,
    updateStatus: (status: string) => void,
    savePhoto: (file:File) => void,
    saveProfile: (profile:ProfileType) => Promise<any> 
}

type PathParamsType = {
    userId: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends Component<PropsType> {
    refreshProfile() {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId; //Мой профиль!!!
            if (!userId) {
                //todo: maybe replace push with Redirect???
                //редирект на логин, если нет id юзера (мой id)
                this.props.history.push("/login");
            }
        }

        if (!userId) {
            console.error("Id should exists in URL params or in state ('authorizedUserId')");
        }
        else {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps:PropsType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    componentWillUnmount(): void {
        // Почитать про этот жизненный цикл
    }

    render() {
        return (
            <Profile {...this.props} isOwner={+this.props.match.params.userId === this.props.authorizedUserId} 
            profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} 
            savePhoto={this.props.savePhoto} />
        );
    }
}

let mapStateToProps = (state:AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose<ComponentType>(
    connect(mapStateToProps,
        {
            getUserProfile: getUserProfileThunkCreator,
            getStatus: getStatusThunkCreator,
            updateStatus: updateStatusThunkCreator,
            savePhoto: savePhotoThunkCreator,
            saveProfile: saveProfileThunkCreator
        }),
    withRouter
)(ProfileContainer);




