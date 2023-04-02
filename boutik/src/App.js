import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import MapDemo from './components/MapDemo';
import Blog from './components/Blog';
import Calc from './components/Calc';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" >
          <Route path='home' element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="maps" element={<MapDemo />} />
          <Route path="blog" element={<Blog />} />
          <Route path="cal" element={<Calc />} />
          <Route path="/product/:productId" element={<ProductDetails/>} />
          
        </Route>
      </Routes>
      

      {/* <Login /> */}
      {/* <Register /> */}
    </>
  );
}

export default App;
