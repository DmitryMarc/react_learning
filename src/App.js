import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './Components/common/Preloader/Preloader';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import HeaderContainer from './Components/Header/HeaderContainer';
import LoginPage from './Components/Login/Login';
import Music from './Components/Music/Music';
import News from './Components/News/News';
import ProfileContainer from './Components/Profile/ProfileContainer';
import Settings from './Components/Settings/Settings';
import SideBar from './Components/Side-bar/Side-bar';
import UsersContainer from './Components/Users/UsersContainer';
import { initializeAppTC } from './Redux/app-reducer';

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized){
      return <Preloader/>
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <SideBar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs' render={() => <DialogsContainer />} />
          <Route path='/profile/:userId?' render={() => <ProfileContainer />} />
          <Route path='/users' render={() => <UsersContainer />} />
          <Route path='/news' render={() => <News />} />
          <Route path='/music' render={() => <Music />} />
          <Route path='/settings' render={() => <Settings />} />
          <Route path='/login' render={() => <LoginPage />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp: initializeAppTC}))
  (App);   



