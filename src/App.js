import { renderIntoDocument } from 'react-dom/test-utils';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import Header from './Components/Header/Header';
import Music from './Components/Music/Music';
import News from './Components/News/News';
import Profile from './Components/Profile/Profile';
import Settings from './Components/Settings/Settings';
import SideBar from './Components/Side-bar/Side-bar';


const App = (props) => {
  return (
    <div className='app-wrapper'>
      <Header />
      <SideBar />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/dialogs/*' element={<DialogsContainer />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/news' element={<News />} />
          <Route path='/music' element={<Music />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}


export default App;
