import './Navigation.css'
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const NavBar = () => {
   return (
      <section id='navbar'>
         <div id='navbar-components'>
            <div className='flex center'>
               <div>
                  <NavLink to='/store' exact={true} activeClassName='active'>
                     Home
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
               <NavLink to='/login' exact={true} activeClassName='active'>
                  Login
               </NavLink>
            </div>
         </div>
      </section>
   );
}

export default NavBar;
