import './Navigation.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import vaporLogo from '../../images/vapor-logo.png'
import { useSelector } from 'react-redux';
import DemoLogin from './DemoLogin';

const NavBar = () => {
   const user = useSelector(state => state.session.user)

   return (
      <section id='navbar'>
         <div id='navbar-components'>
            <div className='flex center'>
               <div>
                  <NavLink to='/store' exact={true} activeClassName='active'>
                     <img src={vaporLogo} alt='vapor-logo'></img>
                  </NavLink>
               </div>
               &nbsp;
               &nbsp;
               <div>
                  <NavLink to='/games/new' exact={true} activeClassName='active'>
                     Add Game
                  </NavLink>
               </div>
               <div>
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
               </div>
            </div>
            <div>
               <NavLink to='/cart' exact={true} activeClassName='active'>
                  Cart
               </NavLink>
               <br />
               {
                  !user
                     ?
                     <>
                        <NavLink to='/login' exact={true} activeClassName='active'>
                           Login
                        </NavLink>
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
