import Login from './components/login'
import HomePage from './canvas/HomePage'
import Image from './images/image'
import './App.css';
import {Container} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";



function App() {
  return (
    
    <BrowserRouter>
      <Routes>
          
          <Route  path="/" element = {<Login/>}> 
          </Route>
          <Route path="/home" element = {<HomePage/>}> 
          </Route>
          <Route path="/image" element = {<Image/>}> 
          </Route>
        </Routes>

        </BrowserRouter>

  );
}
export default App;
