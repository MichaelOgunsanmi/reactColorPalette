import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

import {withStyles} from "@material-ui/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import blue  from '@material-ui/core/colors/blue';
import red  from '@material-ui/core/colors/red';

import MiniPalette from "./MiniPalette";

import styles from "./styles/PaletteListStyles";



const PaletteList = (props) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [deletingId, setDeletingId] = useState("");
    const {classes, palettes, history, deletePalette} = props;

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setDeletingId('');
    };

    const handleOpenDialog = (id) => {
        setOpenDialog(true);
        setDeletingId(id);
    };

    const goToPalette = (paletteId) => {
        history.push(`/palette/${paletteId}`)
    };

    const paletteList = palettes.map( palette =>
        <CSSTransition timeout={500} classNames={'fade'} key={palette.id}>
            <MiniPalette
            {...palette}
            openDialog={handleOpenDialog}
            goToPalette={goToPalette}
            id={palette.id}
            />
        </CSSTransition>
    );

    const handlePaletteDelete = () => {
        deletePalette(deletingId);
        handleCloseDialog();
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
            <Dialog onClose={handleCloseDialog} aria-labelledby="confirm-delete-palette" open={openDialog}>
                <DialogTitle id="confirm-delete-palette">Delete This Palette?</DialogTitle>
                <List>
                    <ListItem autoFocus button onClick={handlePaletteDelete}>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                                <CheckIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Delete" />
                    </ListItem>
                    <ListItem autoFocus button onClick={handleCloseDialog}>
                        <ListItemAvatar>
                            <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                                <CloseIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Cancel" />
                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
};

export default withStyles(styles)(PaletteList);



