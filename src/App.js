
import { renderIntoDocument } from 'react-dom/test-utils';
import './App.css';
import Header from './Header.js';
import Technologies from './Technologies.js';

const App = () => {
  return (
    <div>
      <Header />
      <Technologies />
    </div>
  );
}




export default App;
