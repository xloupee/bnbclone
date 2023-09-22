import ReorderIcon from '@mui/icons-material/Reorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../cssfolder/Navbar.css'
import CastleIcon from '@mui/icons-material/Castle';
import CabinIcon from '@mui/icons-material/Cabin';
import SailingIcon from '@mui/icons-material/Sailing';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BungalowIcon from '@mui/icons-material/Bungalow';

export default function Navbar() {
    const [isDropped, setIsDropped] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState(null);

    const houseTypes = [
        { key: 'home', label: 'Homes', Icon: HomeIcon },
        { key: 'apartment', label: 'Apartment', Icon: ApartmentIcon },
        { key: 'cabin', label: 'Cabins', Icon: CabinIcon },
        { key: 'boats', label: 'Boats', Icon: SailingIcon },
        { key: 'beach', label: 'Beaches', Icon: BeachAccessIcon },
        { key: 'castle', label: 'Castles', Icon: CastleIcon },
        { key: 'omg', label: 'OMG!', Icon: RocketLaunchIcon },
        { key: 'bungalow', label: 'Bungalow', Icon: BungalowIcon },
    ];
    


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
            <div className='house-types'>
                {houseTypes.map(type => (
                     <div key={type.key} className={`icon-container ${type.key}`}>
                         <button 
                            className={`icon ${selectedIcon === type.key ? 'selected' : ''}`} 
                            onClick={() => setSelectedIcon(type.key)}
                        >
                            <type.Icon />
                            <p>{type.label}</p>
                         </button>
                     </div>
                ))}
            </div>

         </div>
    )
}