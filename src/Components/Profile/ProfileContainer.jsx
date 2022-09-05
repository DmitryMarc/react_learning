import * as axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile'; 
import {Redirect, withRouter} from 'react-router-dom';
import {getUserProfileThunkCreator} from '../../Redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

class ProfileContainer extends React.Component {
    componentDidMount(){
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = 2;
        }
        this.props.getUserProfile(userId);
    }

    render() {
        return (      
            <Profile {...this.props} profile={this.props.profile} />
        );
    }
}
                            //вызов HOC
let AuthRedirectComponent = withAuthRedirect (ProfileContainer);

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile
    }
}


let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

export default connect(mapStateToProps, 
    {getUserProfile: getUserProfileThunkCreator})(WithUrlDataContainerComponent);