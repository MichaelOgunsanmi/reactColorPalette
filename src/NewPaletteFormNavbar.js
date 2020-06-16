import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {ValidatorForm} from 'react-material-ui-form-validator';
import {Link} from "react-router-dom";
import NewPaletteMetaForm from "./NewPaletteMetaForm";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        height: "64px"
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    navButtons: {
        marginRight: "1rem",
        '& a': {
            textDecoration: 'none'
        }
    },
    button: {
        margin: '0 0.5rem'
    }
}));

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
                showPaletteNameForm={showPaletteNameForm}
                paletteNames={paletteNames}
                handleSubmit={handleSubmit}
            />}
        </div>
    );
};

export default NewPaletteFormNavbar;