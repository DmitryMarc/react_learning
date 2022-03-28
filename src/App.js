
import { renderIntoDocument } from 'react-dom/test-utils';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Technologies from './Technologies';



const App = () => {
  return (
    <div>
      <Header />
      <Technologies />
      <Footer />
    </div>
  );
}




export default App;
