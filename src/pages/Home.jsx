import React from "react"
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../cssfolder/home.css';
import { Range } from 'react-range';

import {
    Reorder as ReorderIcon,
    AccountCircle as AccountCircleIcon,
    Castle as CastleIcon,
    Cabin as CabinIcon,
    Sailing as SailingIcon,
    BeachAccess as BeachAccessIcon,
    RocketLaunch as RocketLaunchIcon,
    Home as HomeIcon,
    Apartment as ApartmentIcon,
    Bungalow as BungalowIcon,
    NightShelter as NightShelterIcon,
    Landscape as LandscapeIcon,
    LocalFireDepartment as LocalFireDepartmentIcon,
    Details as DetailsIcon,
    ViewCompact as ViewCompactIcon,
    KeyboardDoubleArrowRight as KeyboardDoubleArrowRightIcon,
    KeyboardDoubleArrowLeft as KeyboardDoubleArrowLeftIcon,
    Tune as TuneIcon
  } from '@mui/icons-material';

export default function Home() {

    const [isDropped, setIsDropped] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [startIconIndex, setStartIconIndex] = useState(0);
    const [isToggled, setIsToggled] = useState(false);
    const [showFilterPopup, setShowFilterPopup] = useState(false);

    
    {/* DATA FOR BAR GRAPH */}
    const data = Array.from({ length: 40 }, () => Math.floor(Math.random() * 950 + 50));
    const [rangeValues, setRangeValues] = useState([50, 1000]);
    


    const houseTypes = [
        { key: 'home', label: 'Homes', Icon: HomeIcon },
        { key: 'apartment', label: 'Apartment', Icon: ApartmentIcon },
        { key: 'cabin', label: 'Cabins', Icon: CabinIcon },
        { key: 'treading', label: 'Treading', Icon: LocalFireDepartmentIcon },
        { key: 'mountain', label: 'National Parks', Icon: LandscapeIcon },
        { key: 'boats', label: 'House Boats', Icon: SailingIcon },
        { key: 'beach', label: 'Beaches', Icon: BeachAccessIcon },
        { key: 'omg', label: 'OMG!', Icon: RocketLaunchIcon },
        { key: 'single', label: 'Rooms', Icon: NightShelterIcon },
        { key: 'offgrid', label: 'Off Grid', Icon: ViewCompactIcon },
        { key: 'aframe', label: 'A-Frames', Icon: DetailsIcon },
        { key: 'castle', label: 'Castles', Icon: CastleIcon },
        { key: 'bungalow', label: 'Bungalow', Icon: BungalowIcon },
    ];
    
    const handleRightArrowClick = () => {
        setStartIconIndex((prevIndex) => (prevIndex + 5) % houseTypes.length);
    };
    
    const handleLeftArrowClick = () => {
        setStartIconIndex((prevIndex) => (prevIndex - 5 + houseTypes.length) % houseTypes.length);
    };
    const displayedIcons = houseTypes.slice(startIconIndex, startIconIndex + 10)
    .concat(houseTypes.slice(0, 10 - (houseTypes.slice(startIconIndex, startIconIndex + 10).length)));
    ``    
    const closeFilterPopup = () => {
        setShowFilterPopup(false);
    };


    const toggleDropDown = () => {
        setIsDropped(!isDropped)
    }   


    return ( 
        <div>
        {showFilterPopup && (
            <div className="filter-backdrop" onClick={closeFilterPopup}>
                <div className="filter-popup" onClick={e => e.stopPropagation()}>
                    <button className="close-btn" onClick={closeFilterPopup}>X</button>
                    <h2>Filters</h2>
                    <div className="price-range">Price Range</div>
                    <div className="average-price">The average nightly price is $805</div>

                    {/* Bar graph */}
                    <div className="bar-graph">
                        {data.map((value, index) => (
                            <div key={index} className="bar" style={{ height: `${value/10}px` }}></div>
                        ))}
                    </div>

                    {/* Range Slider */}
                    <Range
                        step={5}
                        min={50}
                        max={1000}
                        values={rangeValues}
                        onChange={(values) => setRangeValues(values)}
                        renderTrack={({ props, children }) => (
                            <div {...props} className="slider-track">
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div {...props} className="slider-thumb"></div>
                        )}
                    />
                    <div className="input-area">
                        <label>
                            Minimum:
                            <input type="number" name="minimum" placeholder="Minimum"/>
                        </label>
                        <span className="separator">-</span>
                        <label>
                            Maximum:
                            <input type="number" name="maximum" placeholder="Maximum" />
                        </label>
                    </div>
                </div>
            </div>
        )}
        <div className='house-types'>
            <div className="icon-container navigate-icon" onClick={handleLeftArrowClick}>
                <KeyboardDoubleArrowLeftIcon />
            </div>

            <div className="icons-wrapper">
                {displayedIcons.map((type, index) => (
                    <div 
                        key={type.key} 
                        className={`icon-container ${type.key}`}
                    >
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
            
            <div className="icon-container navigate-icon" onClick={handleRightArrowClick}>
                <KeyboardDoubleArrowRightIcon />
            </div>
            <button className="filter-container" onClick={() => setShowFilterPopup(true)}>
                <TuneIcon className="filter-icon" fontSize="small"/>
                <span className="filter-text">Filters</span>
            </button>
            <button className="taxes-container" onClick={() => setIsToggled(!isToggled)}>
                <span className="taxes-text">Display total before taxes</span>
                <div className={`toggle-switch ${isToggled ? 'active' : ''}`}>
                    <div className="switch-circle"></div>
                </div>
            </button>
        </div>

     </div>
    )
}
