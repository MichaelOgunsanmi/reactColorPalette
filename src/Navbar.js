import React, {useState} from 'react';

import {Link} from "react-router-dom";
import Slider from "rc-slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import {withStyles} from "@material-ui/styles";
import "rc-slider/assets/index.css"
import styles from "./styles/NavabrStyles";


const Navbar = (props) => {
    const [format, setFormat] = useState("hex");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const {classes, changeColorFormat, showSlider, level, changeLevel} = props;


    const handleFormatChange = (event) => {
        const selectedFormat = event.target.value;
        setFormat(selectedFormat);
        setOpenSnackbar(true);
        changeColorFormat(selectedFormat);
    };

    const handleCloseSnackbar = () => {setOpenSnackbar(false)};


    return (
        <header className={classes.Navbar}>
            <div className={classes.logo}>
                <Link to={'/'}>reactcolorpalette</Link>
            </div>
            {showSlider &&
            <div>
                <span>Level: {level}</span>
                <div className={classes.slider}>
                    <Slider
                        defaultValue={level}
                        min={100}
                        max={900}
                        step={100}
                        onAfterChange={changeLevel}
                    />
                </div>
            </div>}
            <div className={classes.selectContainer}>
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

export default withStyles(styles)(Navbar);