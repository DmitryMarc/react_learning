
import { renderIntoDocument } from 'react-dom/test-utils';
import './App.css';
import Header from './Components/Header/Header';
import Profile from './Components/Profile/Profile';
import SideBar from './Components/Side-bar/Side-bar';


const App = () => {
  return (
    <div className='app-wrapper'>
      <Header />
      <SideBar />
      <Profile />
    </div>
  );
}




export default App;
