import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/Api';
import '../cssfolder/signup.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';

function Login() { 
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
        const res = await api.post("login", { email, password });
        
        if (res.data.message === "Logged in") {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('firstName', res.data.user.firstname);
            localStorage.setItem('email', res.data.user.email);
            navigate("/home");
        } else {
            alert(res.data.message);
        }
    } catch (err) {
        alert(`An error occurred: ${err}`);
        console.log(err);
    }
}

    const throwError = () => {
        alert('This website currently does not support this feature')
    }

  return (
    <div className='login-container signup-container'>
        <div className='signup-navbar'>
           <h1>Login</h1>
        </div>
        <form onSubmit={submit} className='navbar-form'>
            <div className='name-section'>
                <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className='input-fields first'/>
                <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className='input-fields last'/>
            </div>
            <p className='signup-paragraph'>We'll email or text you to confirm your email. </p>
            <input type="submit" value="Login" className='airbnb-button login-button'/>
            <ul className='login-buttons-ul'>
                <div className='login-button-div' onClick={throwError}>
                    <MailOutlineIcon className='company-logo mail'/>
                    <p className='login-buttons'>Continue with Email</p>
                </div>
                <div className='login-button-div' onClick={throwError}>
                    <FacebookIcon className='company-logo facebook'/>
                   <p className='login-buttons'>Continue with Facebook</p>
                </div>
                <div className='login-button-div' onClick={throwError}>
                    <GoogleIcon className='company-logo'/>
                   <p className='login-buttons'>Continue with Google</p>
                </div>
                <div className='login-button-div' onClick={throwError}>
                    <AppleIcon className='company-logo'/>
                   <p className='login-buttons'>Continue with Apple</p>
                </div>
            </ul>
        </form>
    </div>
  );
}

export default Login; 
