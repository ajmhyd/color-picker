import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// import useInputState from '../../hooks/useInputState';
import PropTypes from 'prop-types';
import { ColorPickerFormStyles } from './ColorPickerFormStyles';

const useStyles = makeStyles(ColorPickerFormStyles);

export default function ColorPickerForm({
  paletteIsFull,
  colors,
  setColors,
  newColorName,
  setNewColorName,
}) {
  const classes = useStyles();
  const [currentColor, setCurrentColor] = useState('teal');
  const form = useRef(null);

  const updateCurrentColor = newColor => {
    setCurrentColor(newColor.hex);
  };

  const handleSubmit = () => {
    setColors([...colors, currentColor]);
    setNewColorName('');
  };

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      colors.every(({ name }) => name.toLowerCase() !== value.toLowerCase())
    );
    ValidatorForm.addValidationRule('isColorUnique', () =>
      colors.every(({ color }) => color !== currentColor)
    );
  }, [colors, currentColor]);

  return (
    <div>
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className={classes.picker}
      />
      <ValidatorForm onSubmit={handleSubmit} instantValidate ref={form}>
        <TextValidator
          value={newColorName}
          className={classes.colorNameInput}
          placeholder="Color Name"
          name="newColorName"
          variant="filled"
          margin="normal"
          onChange={e => setNewColorName(e.target.value)}
          validators={['required', 'isColorNameUnique', 'isColorUnique']}
          errorMessages={[
            'Enter a color name',
            'Color name must be unique',
            'Color already used!',
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={paletteIsFull}
          className={classes.addColor}
          style={{
            backgroundColor: paletteIsFull ? 'grey' : currentColor,
          }}
        >
          {paletteIsFull ? 'Palette Full' : 'Add Color'}
        </Button>
      </ValidatorForm>
    </div>
  );
}

ColorPickerForm.propTypes = {
  paletteIsFull: PropTypes.bool.isRequired,
  colors: PropTypes.array.isRequired,
  setColors: PropTypes.func.isRequired,
  newColorName: PropTypes.string.isRequired,
  setNewColorName: PropTypes.func.isRequired,
};
