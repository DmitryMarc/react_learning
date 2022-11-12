import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {logoutTC} from '../../Redux/auth-reducer';
import { AppStateType } from '../../Redux/redux-store';

type PropsType = MapStateToProps & MapDispatchPropsType;

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header {...this.props} />
    }
}

type MapStateToProps = {
    isAuth: boolean
    login: string | null
}

type MapDispatchPropsType = {
    logout: () => void
}

const mapStateToProps = (state:AppStateType):MapStateToProps => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});
export default connect<MapStateToProps, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, 
    {logout: logoutTC})(HeaderContainer);   