import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { NavigationBar } from './components/Navbar/NavigationBar';
import { Home } from './pages/Home';


function App() {
  return (
    <div className="App">
     <NavigationBar />
     <Home />
    </div>
  );
}

export default App;
