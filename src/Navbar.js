import React, {useState} from 'react';

import {Link} from "react-router-dom";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import "rc-slider/assets/index.css"
import "./Navbar.css";




const Navbar = (props) => {
    const [format, setFormat] = useState("hex");
    const [openSnackbar, setOpenSnackbar] = useState(false);


    const handleFormatChange = (event) => {
        const selectedFormat = event.target.value;
        setFormat(selectedFormat);
        setOpenSnackbar(true);
        props.changeColorFormat(selectedFormat);
    };

    const handleCloseSnackbar = () => {setOpenSnackbar(false)};


    return (
        <header className="Navbar">
            <div className="logo">
                <Link to={'/'}>reactcolorpalette</Link>
            </div>
            {props.showSlider &&
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
            </div>}
            <div className="select-container">
                <Select value={format} onChange={handleFormatChange}>
                    <MenuItem value="hex">HEX </MenuItem>
                    <MenuItem value="rgb">RGB </MenuItem>
                    <MenuItem value="rgba">RGBA </MenuItem>
                </Select>
            </div>
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "left"}}
                open={openSnackbar}
                autoHideDuration={3000}
                message={<span id="message-id">Color format changed to {format.toUpperCase()}</span>}
                ContentProps={{ "aria-describedby" : "message-id"}}
                onClose={handleCloseSnackbar}
                action={[
                    <IconButton
                        onClick={handleCloseSnackbar}
                        color={'inherit'}
                        key={'close'}
                        aria-label={'close'}
                    >
                        <CloseIcon/>
                    </IconButton>
                ]}

            />
        </header>
    );
};

export default Navbar;