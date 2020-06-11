import React, {useState} from 'react';
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import Footer from "./Footer";

const SingleColorPalette = (props) => {
    const {colors, paletteName, emoji} = props.palette;
    const [format, setFormat] = useState("hex");

    const changeColorFormat = selectedFormat => {setFormat(selectedFormat)};

    const colorBoxes = colors.map( color => <ColorBox
        key={color.id}
        name={color.name}
        backgroundColor={color[format]}
        showLink={false}
    />);

    return (
        <div className={'Palette'}>
            <Navbar changeColorFormat={changeColorFormat} showSlider={false}/>
            <div className={'Palette-colors'}>
                {colorBoxes}
            </div>
            <Footer paletteName={paletteName} emoji={emoji}/>
        </div>
    );
};

export default SingleColorPalette;