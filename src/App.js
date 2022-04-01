
import { renderIntoDocument } from 'react-dom/test-utils';
import './App.css';
import Dialogs from './Components/Dialogs/Dialogs';
import Header from './Components/Header/Header';
import Profile from './Components/Profile/Profile';
import SideBar from './Components/Side-bar/Side-bar';


const App = () => {
  return (
    <div className='app-wrapper'>
      <Header />
      <SideBar />
      <div className='app-wrapper-content'>
        <Dialogs />
      </div>
      {/* <Profile /> */}
    </div>
  );
}




export default App;
