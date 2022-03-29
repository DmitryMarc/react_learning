
import { renderIntoDocument } from 'react-dom/test-utils';
import './App.css';


const App = () => {
  return (
    <div className ='app-wrapper'>
      <header className='header'>
        <img width = "300" src="https://ves-rf.ru/sites/default/files/article-img/20171214/6.jpg" />
      </header>
      <nav className='side-bar'>
        <ul>
          <li><a href='#'>Ptofile</a></li>
          <li><a href='#'>Messages</a></li>
          <li><a href='#'>News</a></li>
          <li><a href='#'>Music</a></li>
          <li><a href='#'>Settings</a></li>
        </ul>
      </nav>
      <div className='content'>
        <div>
        <img src='https://www.anypics.ru/download.php?file=201211/1280x800/anypics.ru-34518.jpg' />
        </div>
        <div>
          ava + description
        </div>
        <div>
          My posts
          <div>
            New post
          </div>
          <div>
            <div>
              post 1
            </div>
            <div>
              post 2
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}




export default App;
