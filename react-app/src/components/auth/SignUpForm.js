import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [developerAlias, setDeveloperAlias] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, developerAlias, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Password inputs are required and must be matching'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateDeveloperAlias = (e) => {
    setDeveloperAlias(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp}>
      <br />
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <br />
      <div>
        <label>User Name</label>
        <br />
        <input
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>
        <label>Developer Alias</label>
        <br />
        <input
          type='text'
          name='developerAlias'
          onChange={updateDeveloperAlias}
          value={developerAlias}
        ></input>
      </div>
      <div>
        <label>Email</label>
        <br />
        <input
          type='email'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>
        <label>Password</label>
        <br />
        <input
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>
        <label>Repeat Password</label>
        <br />
        <input
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className='clickable' type='submit'>Sign Up</button>
      <br />
      <NavLink to='/login'>
        Already have an account?
      </NavLink>
    </form>
  );
};

export default SignUpForm;
