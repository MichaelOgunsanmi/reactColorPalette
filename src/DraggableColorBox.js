import React from 'react';

import {withStyles} from "@material-ui/styles";
import DeleteIcon from "@material-ui/icons/Delete";


const styles = {
    root: {
        width: "20%",
        height:  "25%",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        margin: "0 auto -3.5px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.5)"
        }
    },
    boxContent: {
        position: "absolute",
        width: "100%",
        left: "0",
        bottom: "0",
        padding: "10px",
        color: "rgba(0, 0, 0, 0.5)",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out",
    }
};

const DraggableColorBox = (props) => {
    const {color, name, classes, handleClick} = props;

    return (
        <div style={{backgroundColor: color}} className={classes.root}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={handleClick}/>
            </div>
        </div>
    );
};

export default withStyles(styles)(DraggableColorBox);