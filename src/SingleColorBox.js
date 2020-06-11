import React from 'react';
import ColorBox from "./ColorBox";

const SingleColorBox = (props) => {
    const {palette} = props

    const colorBoxes = palette.colors.map( color => <ColorBox
        key={color.id}
        name={color.name}
        backgroundColor={color.hex}
        showLink={false}
    />);

    return (
        <div className={'Palette'}>
           <h1>Single Color Palette</h1>
            <div className={'Palette-colors'}>
                {colorBoxes}
            </div>
        </div>
    );
};

export default SingleColorBox;