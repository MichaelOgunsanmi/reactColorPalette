import React from 'react';
import {Link} from "react-router-dom";

import {withStyles} from "@material-ui/styles";

import MiniPalette from "./MiniPalette";

import styles from "./styles/PaletteListStyles";


const PaletteList = (props) => {
    const {classes, palettes, history} = props;

    const paletteList = palettes.map( palette => <MiniPalette {...palette} handleClick={() => goToPalette(palette.id)}/>);

    const goToPalette = (paletteId) => {
        history.push(`/palette/${paletteId}`)
    };

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <nav className={classes.nav}>
                    <h1>React Colors</h1>
                    <Link to={'/palette/new'}>Create Palette</Link>
                </nav>
                <div className={classes.palettes}>
                    {paletteList}
                </div>
            </div>
        </div>
    );
};

export default withStyles(styles)(PaletteList);