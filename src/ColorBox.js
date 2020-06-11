import React, {Component} from 'react';

import chroma from "chroma-js";

import {Link} from "react-router-dom";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {withStyles} from "@material-ui/styles";

import "./ColorBox.css";


const style = {
    ColorBox: {
        width: "20%",
        height: props => props.showingFullPalette ? "25%" : "50%",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        margin: "0 auto -3.5px",
        "&:hover button": {
            opacity: "1",
            transition: "0.5s"
        }
    },
    copyText: {
        color: props => chroma(props.backgroundColor).luminance() >= 0.7 ? "black" : "white"
    },
    colorName: {
        color: props => chroma(props.backgroundColor).luminance() <= 0.08 ? "white" : "black"
    },
    seeMore: {
        color:  props => chroma(props.backgroundColor).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0",
        bottom: "0",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
    },
    copyButton: {
        color: props => chroma(props.backgroundColor).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white",
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        textDecoration: "none",
        border: "none",
        opacity: "0"
    }
};


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
        const {backgroundColor, name, moreURL, showingFullPalette, classes} = this.props;
        const {copied} = this.state;
        const isDarkColor = chroma(backgroundColor).luminance() <= 0.08;
        const isLightColor = chroma(backgroundColor).luminance() >= 0.7;

        return (
            <CopyToClipboard text={backgroundColor} onCopy={this.changeCopyState}>
                <div className={classes.ColorBox} style={{backgroundColor}}>
                    <div className={`copy-overlay ${copied && 'show'}`} style={{backgroundColor}}/>
                    <div className={`copy-message ${copied && 'show'}`}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>{backgroundColor}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-content">
                            <span className={classes.colorName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette &&
                    <Link to={moreURL} onClick={event => event.stopPropagation()}>
                        <span className={classes.seeMore}>MORE</span>
                    </Link>
                    }
                </div>
            </CopyToClipboard>
        );
    };
}

export default withStyles(style)(ColorBox);