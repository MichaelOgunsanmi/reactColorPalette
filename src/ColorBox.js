import React from 'react';

import "./ColorBox.css";

const ColorBox = (props) => {
    const {backgroundColor, name} = props;

    return (
        <div className={"ColorBox"} style={{backgroundColor}}>
            <div className="copy-container">
                <div className="box-content">
                    <span>{name}</span>
                </div>
                <button className="copy-button">Copy</button>
            </div>
            <span className="see-more">More</span>
        </div>
    );
};

export default ColorBox;