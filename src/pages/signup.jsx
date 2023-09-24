import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/Api';

function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
        const res = await api.post("/signup", 
        { 
          firstname: firstName,  
          lastname: lastName,
          email, 
          password, 
        })

        if (res.data.message === "exist") {
            alert('User already exists');
        } 
        else if (res.data.message === "User created") {
            alert('Signup successful!')
            localStorage.setItem('firstName', firstName)
            localStorage.setItem('token', res.data.token)
            navigate("/home", { state: { email: email, firstName: firstName } });
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
            <input type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
            <input type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <input type="submit" value="Sign Up" />
        </form>
    </div>
  );
}

export default SignUp;
