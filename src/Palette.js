import React, {useState} from 'react';

import {withStyles} from "@material-ui/styles";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";

import "./Palette.css";


const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    colors: {
        height: "90%",
    },
    footer: {
        backgroundColor: "white",
        height: "5vh",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontWeight: "bold",
    },
    emoji: {
        fontSize: "1rem",
        margin: "0 1rem",
    }
};

const Palette = (props) => {
    const [level, setLevel] = useState(500);
    const [format, setFormat] = useState("hex");
    const {colors, paletteName, emoji, id} = props.palette;
    const {classes} = props;

    const changeLevel = newLevel => {setLevel(newLevel)};

    const changeColorFormat = selectedFormat => {setFormat(selectedFormat)};

    const colorBoxes = colors[level].map( color => <ColorBox
        backgroundColor={color[format]}
        name={color.name}
        key={color.id}
        moreURL={`/palette/${id}/${color.id}`}
        showingFullPalette
    />);

    return (
        <div className={classes.Palette}>
            <Navbar level={level} changeLevel={changeLevel} changeColorFormat={changeColorFormat} showSlider/>
            <div className={classes.colors}>{colorBoxes}</div>
            <Footer paletteName={paletteName} emoji={emoji}/>
        </div>
    );
};

export default withStyles(styles)(Palette);