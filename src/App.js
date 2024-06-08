import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar'
import User from './components/User/User'
import Home from './components/Home/Home'
import Post from './components/Post/Post'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
          <Route exact path="/" Component={Home}></Route>
          <Route exact path="/users/:userId" Component={User} ></Route>
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
