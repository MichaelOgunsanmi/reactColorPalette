import React, {useState} from 'react';

import {Link} from "react-router-dom";
import {withStyles} from "@material-ui/styles";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import chroma from "chroma-js";


const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    colors: {
        height: "90%",
    },
    goBack: {
        width: "20%",
        height: "50%",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        margin: "0 auto -3.5px",
        opacity: 1,
        backgroundColor: "black",
        "& a": {
            color: "white",
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            fontSize: "1rem",
            lineHeight: "30px",
            textTransform: "uppercase",
            textDecoration: "none",
            border: "none",
        }
    }
};

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