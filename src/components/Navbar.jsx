import ReorderIcon from '@mui/icons-material/Reorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const [isDropped, setIsDropped] = useState(false)

    const toggleDropDown = () => {
        setIsDropped(!isDropped)
    }

    return (
        <div>
            <div className="navbar">
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png' className="navbar-logo"/>
                    <div className='drop-down' onClick={toggleDropDown}>
                        <ReorderIcon className='drop-down-button'/>
                        <AccountCircleIcon />
                        {isDropped && 
                        <ul className='drop-down-items'>
                            <Link to='login'>Login</Link>
                            <li>Signup</li>
                        </ul>
                        }
                    </div>
            </div>
        </div>
    )
}