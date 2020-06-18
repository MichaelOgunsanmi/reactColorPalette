import React, {useEffect, useState} from 'react';

import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import { Picker } from 'emoji-mart'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import 'emoji-mart/css/emoji-mart.css'


const NewPaletteMetaForm = (props) => {
    const [paletteName, setPaletteName] = useState("");
    const [saveStage, setSaveStage] = useState("paletteName");
    const {paletteNames, handleSubmit, handleClosePaletteNameForm} = props;

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return paletteNames.every((inputPaletteName) => inputPaletteName.toLowerCase() !== value.toLowerCase())
        });
    });

    const handlePaletteNameChange = (event) => {
        setPaletteName(event.target.value);
    };

    const handleShowEmoji = () => {
        setSaveStage("emoji")
    };

    const savePalette = (emoji) => {
        const newPalette = {
            paletteName,
            emoji: emoji.native
        };

        handleSubmit(newPalette);
        setSaveStage('');
    };

    return (
        <div>
            <Dialog open={saveStage === "emoji"} onClose={handleClosePaletteNameForm}>
                <DialogTitle id="form-dialog-title">Choose a Palette Emoji</DialogTitle>
                <Picker title={'Pick a palette emoji'} onSelect={savePalette}/>
            </Dialog>
            <Dialog open={saveStage === "paletteName"} onClose={handleClosePaletteNameForm} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={handleShowEmoji}>
                    <DialogContent>
                        <DialogContentText>Choose a name for your new palette. Make sure it is unique!</DialogContentText>
                        <TextValidator
                            label={'Palette Name'}
                            value={paletteName}
                            onChange={handlePaletteNameChange}
                            fullWidth
                            margin={'normal'}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['Enter Palette Name', 'Palette Name is already taken']}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClosePaletteNameForm} color="primary">
                            Cancel
                        </Button>
                        <Button
                            variant={"contained"}
                            color={"primary"}
                            type={'submit'}
                        >
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </div>
    );
};

export default NewPaletteMetaForm;