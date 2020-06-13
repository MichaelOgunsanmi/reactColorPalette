import React from 'react';

import {withStyles} from "@material-ui/styles";


const styles = {
    root: {
        width: "20%",
        height:  "25%",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        margin: "0 auto -3.5px",
    }
};

const DraggableColorBox = (props) => {
    const {color, classes} = props;

    return (
        <div style={{backgroundColor: color}} className={classes.root}>
            {color}
        </div>
    );
};

export default withStyles(styles)(DraggableColorBox);