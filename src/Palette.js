import React, {useState} from 'react';

import ColorBox from "./ColorBox";


import "./Palette.css";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Palette = (props) => {
    const [level, setLevel] = useState(500);
    const [format, setFormat] = useState("hex");
    const {colors, paletteName, emoji, id} = props.palette;

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
        <div className={'Palette'}>
            <Navbar level={level} changeLevel={changeLevel} changeColorFormat={changeColorFormat} showSlider/>
            <div className="Palette-colors">{colorBoxes}</div>
            <Footer paletteName={paletteName} emoji={emoji}/>
        </div>
    );
};

export default Palette;