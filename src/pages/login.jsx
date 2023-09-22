import axios from 'axios';
import React, { useState } from 'react';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault()

    try {
        await axios.post("http://localhost:3000/", {
            email, password
        })
    }
    catch(e){
        console.log(e)
    }
  }
  
  return (
    <div className='signup-container'>
        <h1>Signup</h1>
            <form action="POST">
                <input type="email" onChange={(e)=> {setEmail(e.target.value)}} placeholder="Email" />
                <input type="password" onChange={(e)=> {setEmail(e.target.value)}} placeholder="Password" />
            <input type="submit" onClick={submit}></input>
            </form>
    </div>
  )
}

export default SignUp;
