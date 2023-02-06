import './Navigation.css'
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import vaporLogo from '../../images/vapor-logo.png'
import { useSelector } from 'react-redux';
import DemoLogin from './DemoLogin';

const NavBar = () => {
   const user = useSelector(state => state.session.user)
   const history = useHistory()

   return (
      <section id='navbar'>
         <div id='navbar-components'>
            <div className='main-nav flex center'>
               <div className='clickable logo-container' onClick={()=>history.push('/store')}>
                     <img className='home-logo' src={vaporLogo} alt='vapor-logo'></img>
               </div>
               <div>
                  <button className='cart-add-button' onClick={() => history.push('/games/new')}>
                     Add Game
                  </button>
               </div>
               {/* <div>
                  <ul>
                     <li>
                        Store
                     </li>
                     <li>
                        Community
                     </li>
                     <li>
                        About
                     </li>
                     <li>
                        Support
                     </li>
                  </ul>
               </div> */}
            </div>
            <div className='nav-right'>
               <button className='cart-add-button' onClick={()=>history.push('/cart')}>
                  Cart
               </button>
               <br />
               {
                  !user
                     ?
                     <>
                        <button className='cart-add-button' onClick={() => history.push('/login')}>
                           Login
                        </button>
                        <br/>
                        <DemoLogin />
                     </>
                     :
                     <LogoutButton />
               }
            </div>
         </div>
      </section>
   );
}

export default NavBar;
