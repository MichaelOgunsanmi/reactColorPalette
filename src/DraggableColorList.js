import React from 'react';

import {SortableContainer} from "react-sortable-hoc";

import DraggableColorBox from "./DraggableColorBox";


const DraggableColorList = (props) => {
    const {paletteColors, handleRemoveColorBox} = props;


    return (
        <div style={{height: "100%"}}>
            {paletteColors.map((color, index) => <DraggableColorBox
                index={index}
                key={color.name}
                color={color.color}
                name={color.name}
                handleClick={() => handleRemoveColorBox(color.name)}
            />)}
        </div>
    );
};

export default SortableContainer(DraggableColorList);