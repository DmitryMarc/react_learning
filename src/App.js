import { renderIntoDocument } from 'react-dom/test-utils';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import Header from './Components/Header/Header';
import Music from './Components/Music/Music';
import News from './Components/News/News';
import ProfileContainer from './Components/Profile/ProfileContainer';
import Settings from './Components/Settings/Settings';
import SideBar from './Components/Side-bar/Side-bar';
import UsersContainer from './Components/Users/UsersContainer';


const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <SideBar />
      <div className='app-wrapper-content'>
          <Route path='/dialogs' render={() => <DialogsContainer />}/>
          <Route path='/profile/:userId?' render={() => <ProfileContainer/>} />
          <Route path='/users' render={() => <UsersContainer/>}/>
          <Route path='/news' render={() => <News/>}/>
          <Route path='/music' render={() => <Music/>}/>
          <Route path='/settings' render={() => <Settings/>} />
      </div>
    </div>
  );
}


export default App;
