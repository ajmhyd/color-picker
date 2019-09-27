import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { arrayMove } from 'react-sortable-hoc';
import { NewPaletteFormStyles } from './NewPaletteFormStyles';
import seedColors from '../../src/seedColors';
import ColorPickerForm from '../ColorPickerForm';
import PaletteFormNav from '../PaletteFormNav';
import { DraggableColorList } from '../DraggableColorList';

const useStyles = makeStyles(NewPaletteFormStyles);

export default function NewPaletteForm({
  maxColors = 20,
  palettes = seedColors,
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(seedColors[0].colors);
  const [newColorName, setNewColorName] = useState('');
  const paletteIsFull = colors.length >= maxColors;

  const removeColor = colorName => {
    setColors(colors.filter(color => color.name !== colorName));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  };
  return (
    <div className={classes.root}>
      <PaletteFormNav
        open={open}
        palettes={palettes}
        // handleSubmit={handleSubmit}
        setOpen={setOpen}
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
          <IconButton onClick={() => setOpen(false)}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setColors([])}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              color="primary"
              // onClick={this.addRandomColor}
              disabled={paletteIsFull}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            // addNewColor={addNewColor}
            colors={colors}
            setColors={setColors}
            newColorName={newColorName}
            setNewColorName={setNewColorName}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}
          distance={20}
        />
      </main>
    </div>
  );
}

NewPaletteForm.propTypes = {
  maxColors: PropTypes.number.isRequired,
  palettes: PropTypes.array.isRequired,
};
