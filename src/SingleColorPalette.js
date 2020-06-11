import React, {useState} from 'react';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {Link} from "react-router-dom";

const SingleColorPalette = (props) => {
    const {colors, paletteName, emoji, id} = props.palette;
    const [format, setFormat] = useState("hex");

    const changeColorFormat = selectedFormat => {setFormat(selectedFormat)};

    const colorBoxes = colors.map( color => <ColorBox
        key={color.name}
        name={color.name}
        backgroundColor={color[format]}
        showLink={false}
    />);

    return (
        <div className={'SingleColorPalette Palette'}>
            <Navbar changeColorFormat={changeColorFormat} showSlider={false}/>
            <div className={'Palette-colors'}>
                {colorBoxes}
                <div className="go-back ColorBox">
                    <Link to={`/palette/${id}`} className={'back-button'}>GO BACK</Link>
                </div>
            </div>
            <Footer paletteName={paletteName} emoji={emoji}/>
        </div>
    );
};

export default SingleColorPalette;