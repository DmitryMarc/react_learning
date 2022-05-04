import * as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile'; 
import {withRouter} from 'react-router-dom';
import {setUserProfileActionCreator} from '../../Redux/profile-reducer';

class ProfileContainer extends React.Component {
    componentDidMount(){
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = 2;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
            this.props.setUserProfile(response.data);
        });
    }

    render() {
        return (      
            <Profile {...this.props} profile={this.props.profile} />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, 
    {setUserProfile: setUserProfileActionCreator})(WithUrlDataContainerComponent);