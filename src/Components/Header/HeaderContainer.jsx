import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {logoutTC} from '../../Redux/auth-reducer';

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    }
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});
export default connect(mapStateToProps, 
    {logout: logoutTC})(HeaderContainer);   