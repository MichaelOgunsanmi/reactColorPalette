import React, {useState} from 'react';

import ColorBox from "./ColorBox";


import "./Palette.css";
import Navbar from "./Navbar";


const Palette = (props) => {
    const [level, setLevel] = useState(500);
    const [format, setFormat] = useState("hex");
    const {colors} = props.palette;

    const changeLevel = newLevel => {setLevel(newLevel)};

    const changeColorFormat = selectedFormat => {setFormat(selectedFormat)};

    const colorBoxes = colors[level].map( color => <ColorBox backgroundColor={color[format]} name={color.name}/>);

    return (
        <div className={'Palette'}>
            <Navbar level={level} changeLevel={changeLevel} changeColorFormat={changeColorFormat} />
            {/*Navbar Here*/}
            <div className="Palette-colors">{colorBoxes}</div>
            {/*Footer eventually*/}
        </div>
    );
};

export default Palette;