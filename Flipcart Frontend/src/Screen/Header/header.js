import React, { useState,useEffect } from 'react';
import {useDispatch,useSelector} from 'react-redux'
import './style.css';

import {  IoIosCart, IoIosSearch, } from 'react-icons/io';
import { 
  Modal,
  MaterialInput,
  DropdownMenu
} from '../../MaterialUi/index';
import {Link} from 'react-router-dom'
import { login, signOut } from '../../action/authAction';


const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const cart = useSelector(state=>state.cart)

  

  const auth = useSelector(state=>state.auth)
  const dispatch = useDispatch();

  const logout = ()=>{
    dispatch(signOut())
  }

  const Login = ()=>{
    const user = {
      email,password
    }
    dispatch(login(user))

  }

  const renderCategoryForNotLoggedIn = ()=>{
    return(
      <DropdownMenu
            menu={
              <a href className="loginButton" onClick={() => setLoginModal(true)}>
                Login
              </a>
            }
            menus={[
              { label: 'Sign up', href: '', icon: null },
              { label: 'Flipkart Plus Zone', href: '', icon: null },
              { label: 'Orders', href: '', icon: null },
              { label: 'Wishlist', href: '', icon: null },
              { label: 'Rewards', href: '', icon: null },
              { label: 'Gift Cards', href: '', icon: null },
            ]}
            firstMenu={
              <div className="firstmenu">
                <span>New Customer?</span>
                <a href style={{ color: '#2874f0' }}>Sign Up</a>
              </div>
            }
          />
    )
  }

  


  const renderCategoryForLoggedIn = ()=>{
    return(
      <DropdownMenu
            menu={
              <a className='userName' href>
              { auth.user.firstName +' '+ auth.user.lastName}
             </a>
            }
            menus={[
              { label: 'My Profie', href: '', icon: null },
              { label: 'SuperCoin Zone', href: '', icon: null },
              { label: 'Flipcart Plus Zone', href: '', icon: null },
              { label: 'Orders', href: '/order', icon: null},
              { label: 'WishList', href: '', icon: null },
              { label: 'my Chat', href: '', icon: null },
              { label: 'Coupons', href: '', icon: null },
              { label: 'Rewards', href: '', icon: null },
              { label: 'Notification', href: '', icon: null },
              { label: 'Logout', href: '', icon: null,onClick:logout},
              
            ]}
          />
    )
  }


  useEffect(()=>{
    if(auth.authenticated){
      
    }
  })

  return (
    <div className="header">
      <Modal 
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      >
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
              <img src='https://www.pngarts.com/files/4/Electronic-Transparent-Background-PNG.png' style={{width:'240px',marginTop:'100px'}} alt="" />
            </div>
            <div className="rightspace">
          

                <MaterialInput 
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <MaterialInput 
                  type="password"
                  label="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  rightElement={<a href>Forgot?</a>}
                />
                
                <div style={{marginLeft:'10px',marginRight:'10px',width:'380px'}}>
                <button className="materialButton" onClick={Login} style={{padding:'15px',marginTop:'30px'}}>
                Login
                </button>
            
                </div>
                
            

              

            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <Link to="/">
            <img src='https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png' className="logoimage" alt="" />
          </Link>
          <a href style={{ marginTop: '-10px' }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src='https://img1a.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png' className="goldenStar" alt="" />
          </a>
        </div>
        <div style={{
          padding: '0 10px'
        }}>
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'search for products, brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color: '#2874f0'
              }} />
            </div>

          </div>
        </div>
        <div className="rightMenu">
          {
            !auth.authenticated?
            renderCategoryForNotLoggedIn():renderCategoryForLoggedIn()
          }
          
          <div>
            <a href className="cart">
              <div style={{backgroundColor:'orangered',color:'white',height:'13px',width:'13px',borderRadius:'25px',fontSize:'10px',paddingLeft:'4px',marginBottom:'10px'}}>
              {Object.keys(cart.cartItems).length}
              </div>
              <IoIosCart />
              <p style={{ margin: '0 10px',color:'white' }}><Link to={`/cart`}>Cart</Link></p>
            </a>
          </div>
        </div>

      </div>
    </div>
  )

}


export default Header