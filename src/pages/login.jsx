import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/Api';

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

  return (
    <div className='login-container'>
        <h1>Login</h1>
        <form onSubmit={submit}>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="submit" value="Login" />
        </form>
    </div>
  );
}

export default Login; 
