import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
        const res = await axios.post("http://localhost:3000/signup", { email, password });
        if (res.data === "exist") {
            alert('User already exists');
        } else if (res.data === "User created") {
            alert('Signup successful!')
            navigate("/home", { state: { id: email } });
        }
    } catch (err) {
        alert(`An error occurred: ${err}`);
        console.log(err);
    }
  }

  return (
    <div className='signup-container'>
        <h1>Signup</h1>
        <form onSubmit={submit}>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="submit" value="Sign Up" />
        </form>
    </div>
  );
}

export default SignUp;
