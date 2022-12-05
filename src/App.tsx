import React, { Component, ComponentType, FC } from 'react';
import store, { AppStateType } from './Redux/redux-store';
import { connect, Provider } from 'react-redux';
import { BrowserRouter, Redirect, Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css';
import Preloader from './Components/common/Preloader/Preloader';
import HeaderContainer from './Components/Header/HeaderContainer';
import { LoginPage } from './Components/Login/Login';
import Music from './Components/Music/Music';
import News from './Components/News/News';
import Settings from './Components/Settings/Settings';
import SideBar from './Components/Side-bar/Side-bar';
import { UsersPage } from './Components/Users/UsersContainer';
import { initializeAppTC } from './Redux/app-reducer';
import { withSuspense } from './hoc/withSuspense';

const DialogsContainer = React.lazy(() => import('./Components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./Components/Profile/ProfileContainer'));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  initializeApp: () => void
};

const SuspendedDialogs = withSuspense(DialogsContainer);
const SuspendedProfile = withSuspense(ProfileContainer);

class App extends Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured");
    //console.error(promiseRejectionEvent);
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors );
  }

  componentWillUnmount(){
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors ); // глобальный отлов promise
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <SideBar />
        <div className='app-wrapper-content'>
          {/* если пользователь залогинен, то нужно при инициализации приложения направлять на его профиль(его id)*/}
          <Route path='/' render={() => <Redirect to="/profile" />} />        
          <Route path='/dialogs' render={() => <SuspendedDialogs />} />
          <Route path='/profile/:userId?' render={() => <SuspendedProfile />} />
          <Route path='/users' render={() => <UsersPage pageTitle={"Пользователи"} />} />
          <Route path='/news' render={() => <News />} />
          <Route path='/music' render={() => <Music />} />
          <Route path='/settings' render={() => <Settings />} />
          <Route path='/login' render={() => <LoginPage />} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})
let AppContainer = compose<ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp: initializeAppTC }))
  (App);

const ReactJSApp:FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default ReactJSApp;



