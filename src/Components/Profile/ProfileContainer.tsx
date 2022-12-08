import { Component, ComponentType, FC, useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
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
import { AppDispatchType, AppStateType } from '../../Redux/redux-store';
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

export const ProfileWrapper: FC<PropsType> = (props) => {
    const profile = useSelector((state:AppStateType) => state.profilePage.profile);
    const status = useSelector((state:AppStateType) => state.profilePage.status);
    const authorizedUserId = useSelector((state:AppStateType) => state.auth.userId);
    //const isAuth = useSelector((state:AppStateType) => state.auth.isAuth);

    const dispatch:AppDispatchType = useDispatch();

    const refreshProfile = () => {
        let userId: number | null = +props.match.params.userId;
        if (!userId) {
            userId = authorizedUserId; //Мой профиль!!!
            if (!userId) {
                //todo: maybe replace push with Redirect???
                //редирект на логин, если нет id юзера (мой id)
                props.history.push("/login");
            }
        }
        if (!userId) {
            console.error("Id should exists in URL params or in state ('authorizedUserId')");
        }
        else {
            dispatch(getUserProfileThunkCreator(userId));
            dispatch(getStatusThunkCreator(userId));
        }
    }
    useEffect(() => {
        refreshProfile();
    }, [])

    useEffect(() => {
        if (props.match.params.userId != props.match.params.userId) {
            refreshProfile();
        }
    }, [props])
    
    return (
        <Profile {...props} isOwner={+props.match.params.userId === authorizedUserId} 
        profile={profile} status={status} updateStatus={updateStatusThunkCreator} 
        savePhoto={savePhotoThunkCreator} />
    );
}

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




