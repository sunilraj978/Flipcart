import './App.css';
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Home from './Screen/home';
import React,{useEffect} from 'react'
import ProductScreen from './Screen/ProductScreen/ProductScreen';
import {useDispatch,useSelector} from 'react-redux'
import { isLoggedIn } from './action/authAction';
import ProductDes from './Screen/ProductScreen/ProductStore/ProductDes';
import { updateCart } from './action/CartAction';
import CartPage from './Screen/CartPage';
import checkOut from './Screen/checkOut/index'
import Order from './Screen/order';

function App() {

  const dispatch = useDispatch()

  const auth = useSelector(state=>state.auth)

  
  useEffect(()=>{
    if(!auth.authenticated){
      dispatch(isLoggedIn())
    }
  },[auth.authenticated])

  useEffect(() => {
    console.log("App.js - updateCart");
    dispatch(updateCart());
  }, [auth.authenticate]);

  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route path="/" exact  component={Home} />
        <Route path="/cart" component={CartPage} />
        <Route path='/checkout' component={checkOut} />
        <Route path='/order' component={Order} />
        <Route path='/:productSlug/:productId/p' component={ProductDes}  />
        
        <Route path='/:slug' component={ProductScreen} />
        
       </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
