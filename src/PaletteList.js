import React from 'react';

import {withStyles} from "@material-ui/styles";

import MiniPalette from "./MiniPalette";


const styles = {
    root: {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white"
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%"
    }
};


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
                </nav>
                <div className={classes.palettes}>
                    {paletteList}
                </div>
            </div>
        </div>
    );
};

export default withStyles(styles)(PaletteList);