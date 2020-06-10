import React, {Component} from 'react';

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
        const {backgroundColor, name, moreURL} = this.props;
        const {copied} = this.state;

        return (
            <CopyToClipboard text={backgroundColor} onCopy={this.changeCopyState}>
                <div className={"ColorBox"} style={{backgroundColor}}>
                    <div className={`copy-overlay ${copied && 'show'}`} style={{backgroundColor}}/>
                    <div className={`copy-message ${copied && 'show'}`}>
                        <h1>copied!</h1>
                        <p>{backgroundColor}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                    </div>
                    <Link to={moreURL} onClick={event => event.stopPropagation()}>
                        <span className="see-more">More</span>
                    </Link>
                </div>
            </CopyToClipboard>
        );
    };
}

export default ColorBox;