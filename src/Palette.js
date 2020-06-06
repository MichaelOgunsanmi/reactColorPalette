import React from 'react';
import ColorBox from "./ColorBox";

const Palette = (props) => {
    const colorBoxes = props.colors.map( color => <ColorBox backgroundColor={color.color} name={color.name}/>);
    return (
        <div className={'Palette'}>
            {/*Navbar Here*/}
            <div className="Palette-colors">{colorBoxes}</div>
            {/*Footer eventually*/}
        </div>
    );
};

export default Palette;