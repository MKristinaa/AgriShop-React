
import './App.css';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Footer from './components/Footer';
import Product from './components/pages/Product';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import ProductDetails from './components/pages/ProductDetails';
import Profile from './components/pages/Profile';
import UpdatePorfile from './components/pages/UpdatePorfile';
import UpdatePassword from './components/pages/UpdatePassword';
import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';

function App() {

  useEffect(() => {

  }, [])
  
  return (
    <>
      <Router>

        <Navbar/>
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='/contact' exact Component={Contact}/>
          <Route path='/product' exact  Component={Product}/>
          <Route path='/sign-up' exact Component={SignUp}/>
          <Route path='/login' exact Component={Login}/>
          <Route path='/product/:id' exact Component={ProductDetails}/>
          <Route path='/search/:keyword' exact Component={Product}/>
          <Route path='/me' exact Component={Profile}/>
          <Route path='/me/update' exact Component={UpdatePorfile}/>
          <Route path='/password/update' exact Component={UpdatePassword}/>
          <Route path='/cart' exact Component={Cart}/>
          <Route path='/login/shipping' Component={Shipping}/>
          <Route path='/order/confirm' Component={ConfirmOrder}/>
        </Routes>
        <Footer/>  
        
      </Router>

    </>
  );
}

export default App;
