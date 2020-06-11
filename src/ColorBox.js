import React, {Component} from 'react';

import chroma from "chroma-js";

import {Link} from "react-router-dom";
import {CopyToClipboard} from "react-copy-to-clipboard";

import "./ColorBox.css";


class ColorBox extends Component {
    state = { copied: false};

    changeCopyState = () => {
        this.setState({copied: true}, () => {
            setTimeout( () => {
                this.setState({copied: false})
            }, 1500)
        })
    };

    render () {
        const {backgroundColor, name, moreURL, showLink} = this.props;
        const {copied} = this.state;
        const isDarkColor = chroma(backgroundColor).luminance() <= 0.08;
        const isLightColor = chroma(backgroundColor).luminance() >= 0.7;

        return (
            <CopyToClipboard text={backgroundColor} onCopy={this.changeCopyState}>
                <div className={"ColorBox"} style={{backgroundColor}}>
                    <div className={`copy-overlay ${copied && 'show'}`} style={{backgroundColor}}/>
                    <div className={`copy-message ${copied && 'show'}`}>
                        <h1>copied!</h1>
                        <p className={isLightColor && 'dark-text'}>{backgroundColor}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={isDarkColor && 'light-text'}>{name}</span>
                        </div>
                        <button className={`copy-button ${isLightColor && 'dark-text'}`}>Copy</button>
                    </div>
                    {showLink &&
                    <Link to={moreURL} onClick={event => event.stopPropagation()}>
                        <span className={`see-more ${isLightColor && 'dark-text'}`}>MORE</span>
                    </Link>
                    }
                </div>
            </CopyToClipboard>
        );
    };
}

export default ColorBox;