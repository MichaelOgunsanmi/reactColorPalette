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
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Link} from "react-router-dom";

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

    }
}));

const NewPaletteFormNavbar = (props) => {
    const classes = useStyles();
    const [paletteName, setPaletteName] = useState("");
    const {open, paletteNames, handleDrawerOpen, handleSubmit} = props;

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return paletteNames.every((inputPaletteName) => inputPaletteName.toLowerCase() !== value.toLowerCase())
        });
    });

    const handlePaletteNameChange = (event) => {
        setPaletteName(event.target.value);
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
                    <ValidatorForm onSubmit={() => handleSubmit(paletteName)}>
                        <TextValidator
                            label={'Palette Name'}
                            value={paletteName}
                            onChange={handlePaletteNameChange}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['Enter Palette Name', 'Palette Name is already taken']}
                        />
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            type={'submit'}
                        >
                            Save Palette
                        </Button>
                    </ValidatorForm>
                    <Link to={'/'}>
                        <Button variant={'contained'} color={'secondary'}>Go Back</Button>
                    </Link>
                </div>
            </AppBar>
        </div>
    );
};

export default NewPaletteFormNavbar;