import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() { // Changed from SignUp to Login for clarity
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:3000/login", { email, password });
        
        if (res.data === "exist") {
            navigate("/home", { state: { id: email } });
        } else if (res.data === "does not exist") {
            alert('User has not signed up.');
        } else if (res.data === "Invalid password") {
            alert('Invalid password.');
        }
    } catch (err) {
        alert(`An error occurred: ${err}`);
        console.log(err);
    }
  }

  return (
    <div className='login-container'>
        <h1>Login</h1>
        <form onSubmit={submit}> {/* Removed action="POST" */}
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="submit" value="Login" />
        </form>
    </div>
  );
}

export default Login; // Changed from SignUp to Login for clarity
