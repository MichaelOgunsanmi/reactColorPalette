import React from 'react';
import {CopyToClipboard} from "react-copy-to-clipboard";

import "./ColorBox.css";

const ColorBox = (props) => {
    const {backgroundColor, name} = props;

    return (
        <CopyToClipboard text={backgroundColor}>
            <div className={"ColorBox"} style={{backgroundColor}}>
                <div className="copy-container">
                    <div className="box-content">
                        <span>{name}</span>
                    </div>
                    <button className="copy-button">Copy</button>
                </div>
                <span className="see-more">More</span>
            </div>
        </CopyToClipboard>
    );
};

export default ColorBox;