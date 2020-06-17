import React from 'react';
import {Link} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import {withStyles} from "@material-ui/styles";

import MiniPalette from "./MiniPalette";

import styles from "./styles/PaletteListStyles";


const PaletteList = (props) => {
    const {classes, palettes, history, deletePalette} = props;

    const paletteList = palettes.map( palette =>
        <CSSTransition timeout={500} classNames={'fade'} key={palette.id}>
            <MiniPalette
            {...palette}
            handleDelete={deletePalette}
            handleClick={() => goToPalette(palette.id)}
            id={palette.id}
            />
        </CSSTransition>
    );

    const goToPalette = (paletteId) => {
        history.push(`/palette/${paletteId}`)
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1 className={classes.heading}>React Colors</h1>
                    <Link to={'/palette/new'}>Create Palette</Link>
                </nav>
                <TransitionGroup className={classes.palettes}>
                    {paletteList}
                </TransitionGroup>
            </div>
        </div>
    );
};

export default withStyles(styles)(PaletteList);