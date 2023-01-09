import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { NavigationBar } from './components/Navbar/NavigationBar';
// import { Home } from './pages/Home';
import { Connect } from './pages/connect/Connect';


function App() {
  return (
    <div className="App">
     <NavigationBar />
     <Connect />
     {/* <Home /> */}
    </div>
  );
}

export default App;
