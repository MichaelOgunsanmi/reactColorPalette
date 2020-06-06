import React from 'react';

const ColorBox = (props) => {
    return (
        <div className={"ColorBox"} style={{background: props.backgroundColor}}>
            <span>{props.name}</span>
            <span>MORE</span>
        </div>
    );
};

export default ColorBox;