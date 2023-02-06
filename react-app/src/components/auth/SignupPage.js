import React from 'react';
import './LoginSignupPage.css';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
// import qrCode from '../../images/discord-qr-code.png';
//import backgroundImg from '../../images/login-background.svg';
export default function SignupPage() {

    return (
        <div className='login-page'>
            <div className='main-container'>
                <div className='welcome'>
                    <h1 style={{ margin: 'auto' }}>Welcome back!</h1>
                    <p style={{margin: 'auto'}}>We're so excited to see you again!</p>
                    <div className='sign-up-container2' >
                        <SignUpForm />
                    </div>
                </div>
                {/* <div className='qr-code-container'>
                    <h2>Whiskord Repo</h2>
                    <img src={qrCode} alt='qr-code' />
                </div> */}
            </div>
        </div>
    )
}
