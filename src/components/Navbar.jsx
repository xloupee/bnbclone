import ReorderIcon from '@mui/icons-material/Reorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../cssfolder/Navbar.css'


export default function Navbar() {
    const [isDropped, setIsDropped] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState(null);


    const toggleDropDown = () => {
        setIsDropped(!isDropped)
    }   

    return (
        <div>
            <div className="navbar-container">
                <div className="navbar">
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png' className="navbar-logo"/>
                        <div className='drop-down' onClick={toggleDropDown}>
                            <ReorderIcon className='drop-down-button'/>
                            <AccountCircleIcon />
                            {isDropped && 
                            <ul className='drop-down-items'>
                                <Link to='login'>Login</Link>
                                <Link to='signup'><li>Signup</li></Link>
                                <Link to='home'><li>Home</li></Link>
                            </ul>
                            }
                        </div>
                    </div>
            </div>
    
        </div>
    )
}