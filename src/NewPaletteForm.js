import React, {useState} from 'react';
import clsx from 'clsx';
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
import useStyles from "./styles/NewPaletteFormStyles";


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

    const handleSavePalette = (newPalette) => {
        newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
        newPalette.colors = paletteColors;

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
                <div className={classes.drawerContainer}>
                    <Typography variant={'h4'} gutterBottom>Design your palette</Typography>
                    <div className={classes.buttons}>
                        <Button
                            className={classes.button}
                            variant={'contained'}
                            color={'secondary'}
                            onClick={handleClearPaletteColors}
                        >
                            Clear Palette
                        </Button>
                        <Button
                            className={classes.button}
                            variant={'contained'}
                            color={'primary'}
                            onClick={handleAddRandomColor}
                            disabled={paletteIsFull}
                        >
                            Random Color
                        </Button>
                    </div>
                    <ColorPickerForm paletteIsFull={paletteIsFull} handleAddNewColor={handleAddNewColor} paletteColors={paletteColors}/>
                </div>
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
