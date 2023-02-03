import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import './index.css'
import AllGames from './components/StoreHomePage/AllGames';
import SingleGame from './components/SingleGame';
import CreateGameForm from './components/SingleGame/CreateGameForm';
import Cart from './components/Cart';

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/store' exact={true}>
          <AllGames />
        </Route>
        <ProtectedRoute path='/games/new' exact={true}>
          <CreateGameForm />
        </ProtectedRoute>
        <Route path='/games/:gameId'>
          <SingleGame />
        </Route>
        <ProtectedRoute path='/cart' exact={true}>
          <Cart />
        </ProtectedRoute>
        <Route path='/'>
          <Redirect to='/store' />
        </Route>
      </Switch>
    </>
  );
}

export default App;
