import logo from './logo.svg';
import './App.css';
import Nabar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';

function App() {
  return (
    <>
      <Nabar />
      <Routes>
        <Route path="/" >
          <Route path='home' element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
      

      {/* <Login /> */}
      {/* <Register /> */}
    </>
  );
}

export default App;
