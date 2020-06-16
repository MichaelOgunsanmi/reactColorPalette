import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import {ChromePicker} from 'react-color';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';



const ColorPickerForm = (props) => {
    const [currentColor, setCurrentColor] = useState('teal');
    const [colorName, setColorName] = useState("");
    const {paletteIsFull, handleAddNewColor, paletteColors} = props;

    useEffect(() => {
        ValidatorForm.addValidationRule('isColorNameUnique', value => {
            return paletteColors.every(({name}) => name.toLowerCase() !== value.toLowerCase())
        });

        ValidatorForm.addValidationRule('isColorUnique', value => {
            return paletteColors.every(({color}) => color !== currentColor)
        });
    });

    const handleUpdateCurrentColor = (newColor) => {
        setCurrentColor(newColor.hex);
    };

    const handleColorNameChange = (event) => {
        setColorName(event.target.value);
    };

    const handleSubmit = () => {
        const newColor = {color: currentColor, name: colorName};

        handleAddNewColor(newColor);

        setColorName("");
    };


    return (
        <div>
            <ChromePicker color={currentColor} onChangeComplete={handleUpdateCurrentColor}/>
            <ValidatorForm onSubmit={handleSubmit}>
                <TextValidator
                    value={colorName}
                    onChange={handleColorNameChange}
                    validators={["required", "isColorNameUnique", "isColorUnique"]}
                    errorMessages={["Enter a color name", "Color name must be unique", "Color already used"]}
                />
                <Button
                    variant={'contained'}
                    color={'primary'}
                    style={{backgroundColor: paletteIsFull ? 'grey' : currentColor}}
                    type={'submit'}
                    disabled={paletteIsFull}
                >
                    {paletteIsFull ? 'Palette Full' : 'Add Color'}
                </Button>
            </ValidatorForm>
        </div>
    );
};

export default ColorPickerForm;