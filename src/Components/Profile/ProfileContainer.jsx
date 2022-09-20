import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile'; 
import {withRouter} from 'react-router-dom';
import {getStatusThunkCreator, getUserProfileThunkCreator, updateStatusThunkCreator} from '../../Redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
    componentDidMount(){
        let userId = this.props.match.params.userId;
        if(!userId){
            userId = 23977; //Мой профиль!!!
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    render() {
        return (      
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus} />
        );
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
}

export default compose(
    connect(mapStateToProps, 
        {getUserProfile: getUserProfileThunkCreator,
        getStatus: getStatusThunkCreator,
        updateStatus: updateStatusThunkCreator
        }),
    withRouter
    // withAuthRedirect
)(ProfileContainer);




