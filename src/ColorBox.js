import React, {Component} from 'react';
import classNames from 'classnames';

import {Link} from "react-router-dom";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {withStyles} from "@material-ui/styles";

import styles from "./styles/ColorBoxStyles";


class ColorBox extends Component {
    state = { copied: false};

        changeCopyState = () => {
        this.setState({copied: true}, () => {
            setTimeout( () => {
                this.setState({copied: false})
            }, 1500)
        });
    };

    render () {
        const {backgroundColor, name, moreURL, showingFullPalette, classes} = this.props;
        const {copied} = this.state;


        return (
            <CopyToClipboard text={backgroundColor} onCopy={this.changeCopyState}>
                <div className={classes.ColorBox} style={{backgroundColor}}>
                    <div className={classNames(classes.copyOverlay, {[classes.showOverlay]: copied})} style={{backgroundColor}}/>
                    <div className={classNames(classes.copyMessage, {[classes.showMessage]: copied})}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>{backgroundColor}</p>
                    </div>
                    <div>
                        <div className={classes.boxContent}>
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

export default withStyles(styles)(ColorBox);