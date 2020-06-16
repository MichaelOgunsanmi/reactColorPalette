import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DraggableColorList from "./DraggableColorList";
import {arrayMove} from "react-sortable-hoc";
import NewPaletteFormNavbar from "./NewPaletteFormNavbar";
import ColorPickerForm from "./ColorPickerForm";


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
    const [paletteColors, setPaletteColors] = useState(props.starterColors);

    const paletteIsFull = paletteColors.length >= props.maxColors;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleAddNewColor = (newColor) => {
        setPaletteColors([...paletteColors, newColor]);
    };

    const handleRemoveColorBox = (colorName) => {
        setPaletteColors(paletteColors.filter(paletteColor => paletteColor.name !== colorName))
    };

    const handleDragAndDrop = (colorBoxPositions) => {
        const {oldIndex, newIndex} = colorBoxPositions;

        const newPaletteColors = arrayMove(paletteColors, oldIndex, newIndex);

        setPaletteColors(newPaletteColors)
    };

    const handleSavePalette = (paletteName) => {

        const newPalette = {
            paletteName,
            id: paletteName.toLowerCase().replace(/ /g, '-'),
            colors: paletteColors
        };

        props.savePalette(newPalette);

        props.history.push('/');
    };

    const handleClearPaletteColors = () => {
        setPaletteColors([]);
    };

    const handleAddRandomColor = () => {
        const randomColor = props.allColors[Math.floor(Math.random() * props.allColors.length)];

        setPaletteColors([...paletteColors, randomColor]);
    };


    return (
        <div className={classes.root}>
            <NewPaletteFormNavbar
                classes={classes}
                open={open}
                paletteNames={props.paletteNames}
                handleSubmit={handleSavePalette}
                handleDrawerOpen={handleDrawerOpen}
            />
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
                    <Button variant={'contained'} color={'secondary'} onClick={handleClearPaletteColors}>Clear Palette</Button>
                    <Button variant={'contained'} color={'primary'} onClick={handleAddRandomColor} disabled={paletteIsFull}>Random Color</Button>
                </div>
                <ColorPickerForm paletteIsFull={paletteIsFull} handleAddNewColor={handleAddNewColor} paletteColors={paletteColors}/>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                <DraggableColorList
                    paletteColors={paletteColors}
                    handleRemoveColorBox={handleRemoveColorBox}
                    axis={'xy'}
                    onSortEnd={handleDragAndDrop}
                />
            </main>
        </div>
    );
};

NewPaletteForm.defaultProps = {
    maxColors: 20
};

export default NewPaletteForm;
