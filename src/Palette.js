import React, {useState} from 'react';
import Slider from "rc-slider";
import ColorBox from "./ColorBox";

import "rc-slider/assets/index.css"
import "./Palette.css";


const Palette = (props) => {
    const [level, setLevel] = useState(500);
    const {colors} = props.palette;

    const changeLevel = (level) => {setLevel(level)};

    const colorBoxes = colors[level].map( color => <ColorBox backgroundColor={color.hex} name={color.name}/>);

    return (
        <div className={'Palette'}>
            <div className="slider">
                <Slider
                    defaultValue={level}
                    min={100}
                    max={900}
                    step={100}
                    onAfterChange={changeLevel}
                />
            </div>
            {/*Navbar Here*/}
            <div className="Palette-colors">{colorBoxes}</div>
            {/*Footer eventually*/}
        </div>
    );
};

export default Palette;