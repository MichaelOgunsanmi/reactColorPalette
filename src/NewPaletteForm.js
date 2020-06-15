import React, {useEffect, useState} from 'react';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ChromePicker} from 'react-color';
import DraggableColorBox from "./DraggableColorBox";
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
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
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: "calc(100vh - 64px)",
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const NewPaletteForm = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [currentColor, setCurrentColor] = useState('teal');
    const [paletteColors, setPaletteColors] = useState([]);
    const [colorName, setColorName] = useState("");
    const [paletteName, setPaletteName] = useState("");

    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', value => {
            return paletteColors.every(({name}) => name.toLowerCase() !== value.toLowerCase())
        });

        ValidatorForm.addValidationRule('isColorUnique', value => {
            return paletteColors.every(({color}) => color !== currentColor)
        });

        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return props.paletteNames.every((inputPaletteName) => inputPaletteName.toLowerCase() !== value.toLowerCase())
        });
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleUpdateCurrentColor = (newColor) => {
        setCurrentColor(newColor.hex);
    };

    const handleAddNewColor = () => {
        const newColor = {color: currentColor, name: colorName};

        setPaletteColors([...paletteColors, newColor]);
        setColorName("");
    };

    const handleRemoveColorBox = (colorName) => {
        setPaletteColors(paletteColors.filter(paletteColor => paletteColor.name !== colorName))
    };

    const handleColorNameChange = (event) => {
        setColorName(event.target.value);
    };

    const handlePaletteNameChange = (event) => {
        setPaletteName(event.target.value);
    };


    const handleSavePalette = () => {

        const newPalette = {
            paletteName,
            id: paletteName.toLowerCase().replace(/ /g, '-'),
            colors: paletteColors
        };

        props.savePalette(newPalette);

        props.history.push('/');
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
                        Persistent drawer
                    </Typography>
                    <ValidatorForm onSubmit={handleSavePalette}>
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
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <Typography variant={'h4'}>Design your palette</Typography>
                <div>
                    <Button variant={'contained'} color={'secondary'}>Clear Palette</Button>
                    <Button variant={'contained'} color={'primary'}>Random Color</Button>
                </div>
                <ChromePicker color={currentColor} onChangeComplete={handleUpdateCurrentColor}/>
                <ValidatorForm onSubmit={handleAddNewColor}>
                    <TextValidator
                        value={colorName}
                        onChange={handleColorNameChange}
                        validators={["required", "isColorNameUnique", "isColorUnique"]}
                        errorMessages={["Enter a color name", "Color name must be unique", "Color already used"]}
                    />
                    <Button
                        variant={'contained'}
                        color={'primary'}
                        style={{backgroundColor: currentColor}}
                        type={'submit'}>
                        Add Color
                    </Button>
                </ValidatorForm>

            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {paletteColors.map(color => <DraggableColorBox
                    key={color.name}
                    color={color.color}
                    name={color.name}
                    handleClick={() => handleRemoveColorBox(color.name)}
                />)}
            </main>
        </div>
    );
};

export default NewPaletteForm;
