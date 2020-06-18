import React, {memo} from 'react';

import DeleteIcon from '@material-ui/icons/Delete';

import {withStyles} from "@material-ui/styles";
import styles from "./styles/MiniPaletteStyles";


const MiniPalette = (props) => {
    const {classes, paletteName, emoji, colors, goToPalette, openDialog, id} = props;

    const miniColorBoxes = colors.map( color => <div
                                                    className={classes.miniColor}
                                                    style={{backgroundColor: color.color}}
                                                    key={color.name}
                                                />
                                       );

    const deletePalette = (event) => {
        event.stopPropagation();

        openDialog(id);
    };

    const handleClick = () => {
        goToPalette(id)
    };

    return (
        <div className={classes.root} onClick={handleClick}>
            <DeleteIcon className={classes.deleteIcon} style={{transition: 'all 0.3s ease-in-out'}} onClick={deletePalette}/>
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>
                {paletteName} <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    );
};

export default withStyles(styles)(memo(MiniPalette));