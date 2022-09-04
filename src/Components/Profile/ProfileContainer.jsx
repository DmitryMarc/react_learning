import * as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile'; 
import {Redirect, withRouter} from 'react-router-dom';
import {getUserProfileThunkCreator} from '../../Redux/profile-reducer';
// import { usersAPI } from '../../api/api';

class ProfileContainer extends React.Component {
    componentDidMount(){
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = 2;
        }
        this.props.getUserProfile(userId);
    }

    render() {
        //Защата от неавторизованного пользователя
        if (!this.props.isAuth)
            return <Redirect to="/login"/>
        return (      
            <Profile {...this.props} profile={this.props.profile} />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, 
    {getUserProfile: getUserProfileThunkCreator})(WithUrlDataContainerComponent);