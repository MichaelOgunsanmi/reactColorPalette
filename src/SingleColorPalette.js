import React, {useState} from 'react';

import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/styles";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";

import styles from "./styles/SingleColorPaletteStyles";


const SingleColorPalette = (props) => {
    const {colors, paletteName, emoji, id} = props.palette;
    const {classes} = props;
    const [format, setFormat] = useState("hex");

    const changeColorFormat = selectedFormat => {setFormat(selectedFormat)};

    const colorBoxes = colors.map( color => <ColorBox
        key={color.name}
        name={color.name}
        backgroundColor={color[format]}
        showingFullPalette={false}
    />);

    return (
        <div className={classes.Palette}>
            <Navbar changeColorFormat={changeColorFormat} showSlider={false}/>
            <div className={classes.colors}>
                {colorBoxes}
                <div className={classes.goBack}>
                    <Link to={`/palette/${id}`}>GO BACK</Link>
                </div>
            </div>
            <Footer paletteName={paletteName} emoji={emoji}/>
        </div>
    );
};

export default withStyles(styles)(SingleColorPalette);