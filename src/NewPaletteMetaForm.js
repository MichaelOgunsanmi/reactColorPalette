import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";


const NewPaletteMetaForm = (props) => {
    const [paletteName, setPaletteName] = useState("");
    const {paletteNames, handleSubmit, handleClosePaletteNameForm, showPaletteNameForm} = props;

    useEffect(() => {
        ValidatorForm.addValidationRule('isPaletteNameUnique', value => {
            return paletteNames.every((inputPaletteName) => inputPaletteName.toLowerCase() !== value.toLowerCase())
        });
    });

    const handlePaletteNameChange = (event) => {
        setPaletteName(event.target.value);
    };

    return (
        <Dialog open={showPaletteNameForm} onClose={handleClosePaletteNameForm} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
            <ValidatorForm onSubmit={() => handleSubmit(paletteName)}>
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
    );
};

export default NewPaletteMetaForm;