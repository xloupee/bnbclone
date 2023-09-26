import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/Api';
import CloseIcon from '@mui/icons-material/Close';
import '../cssfolder/signup.css'

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
            localStorage.setItem('email', email)
            navigate("/home", { state: { email: email, firstName: firstName } });
        }
    } catch (err) {
        alert(`An error occurred: ${err}`);
        console.log(err);
    }
  }

  return (
    <div className='signup-container'>
      <div className='signup-navbar'>
          <h2>Sign Up</h2>        
      </div>
        <form onSubmit={submit} className='navbar-form'>
          <div className='name-section'>
            <input type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className='input-fields first'/>
            <input type="text" onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className='input-fields last'/>
          </div>
            <p className='signup-paragraph'>Make sure it matches the name on your government ID.</p>
            <input type="birthdate" onChange={(e) => setEmail(e.target.value)} placeholder="Birthdate (mm/dd/yyyy)" className='input-fields birthdate' />
            <p className='signup-paragraph'>To sign up, you need to be at least 18. Your birthday won't be shared with other people who use Airbnb.</p>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" className='input-fields birthdate' />
            <p className='signup-paragraph'>We'll email you trip confirmations and reciepts.</p>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className='input-fields birthdate'/>
            <p className='signup-paragraph'>We'll send you marketing promotions, special offers, inspiration and policy updates via email.</p>
            
            <div className='checkbox-section'>
              <input type='checkbox' className='checkbox'/>
              <p>I don't want to recieve marketing messages from Airbnb. I can also opt out of recieving these at anytime in my account settings or via the link in the message.</p>
            </div>
            <p>By selecting <string>Agree and continue</string> below, I agree to Airbnb's Terms of Service, Payments Terms of Service, Privacy Policy, and Nondiscrimination Policy</p>
            <input type="submit" value="Sign Up" className='airbnb-button'/>
        </form>
    </div>
  );
}

export default SignUp;
