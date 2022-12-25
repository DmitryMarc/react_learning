import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import {
    getStatusThunkCreator, 
    getUserProfileThunkCreator,
} from '../../Redux/profile-reducer';
import { AppDispatchType, AppStateType } from '../../Redux/redux-store';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

export const Profile: FC<RouteComponentProps<{userId: string}>> = (props) => {
    let authorizedUserId = useSelector((state:AppStateType) => state.auth.userId);
    // const isAuth = useSelector((state:AppStateType) => state.auth.isAuth);

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
        //if (this.props.match.params.userId != prevProps.match.params.userId) {
        refreshProfile();
    }, [props.match.params.userId])
    
    return (
        <div>
            <ProfileInfo isOwner={+props.match.params.userId === authorizedUserId} />
            <MyPostsContainer />
        </div>
    );
}

// let mapStateToProps = (state:AppStateType) => {
//     return {
//         isAuth: state.auth.isAuth
//     }
// }

export default withRouter(Profile);




