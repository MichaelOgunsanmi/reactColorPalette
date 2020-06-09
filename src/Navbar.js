import React, {useState} from 'react';


import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";


import "rc-slider/assets/index.css"
import "./Navbar.css";


const Navbar = (props) => {
    const [format, setFormat] = useState("hex");

    const handleFormatChange = (event) => {
        const selectedFormat = event.target.value;
        setFormat(selectedFormat);
        props.changeColorFormat(selectedFormat);
    };


    return (
        <header className="Navbar">
            <div className="logo">
                <a href="#">reactcolorpalette</a>
            </div>
            <div className="slider-container">
                <span>Level: {props.level}</span>
                <div className="slider">
                    <Slider
                        defaultValue={props.level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={props.changeLevel}
                    />
                </div>
            </div>
            <div className="select-container">
                <Select value={format} onChange={handleFormatChange}>
                    <MenuItem value="hex">HEX </MenuItem>
                    <MenuItem value="rgb">RGB </MenuItem>
                    <MenuItem value="rgba">RGBA </MenuItem>
                </Select>
            </div>
        </header>
    );
};

export default Navbar;