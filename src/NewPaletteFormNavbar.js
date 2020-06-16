import React, {useState} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

import {Link} from "react-router-dom";
import NewPaletteMetaForm from "./NewPaletteMetaForm";

import useStyles from "./styles/NewPaletteFormNavbarStyles";



const NewPaletteFormNavbar = (props) => {
    const classes = useStyles();
    const [showPaletteNameForm, setShowPaletteNameForm] = useState(false);
    const {open, paletteNames, handleDrawerOpen, handleSubmit} = props;


    const handleShowPaletteNameForm = () => {
        setShowPaletteNameForm(true);
    };

    const handleClosePaletteNameForm = () => {
        setShowPaletteNameForm(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                color={"default"}
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                            Create A Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navButtons}>
                    <Link to={'/'}>
                        <Button variant={'contained'} color={'secondary'} className={classes.button}>Go Back</Button>
                    </Link>
                    <Button variant="contained" color="primary" onClick={handleShowPaletteNameForm} className={classes.button}>Save</Button>
                </div>
            </AppBar>
            {showPaletteNameForm && <NewPaletteMetaForm
                handleClosePaletteNameForm={handleClosePaletteNameForm}
                paletteNames={paletteNames}
                handleSubmit={handleSubmit}
            />}
        </div>
    );
};

export default NewPaletteFormNavbar;