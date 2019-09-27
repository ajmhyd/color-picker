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
import { NewPaletteFormStyles } from './NewPaletteFormStyles';
import seedColors from '../../src/seedColors';

const useStyles = makeStyles(NewPaletteFormStyles);

export default function NewPaletteForm({ maxColors, palettes }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [colors, setColors] = useState(seedColors[0].colors);
  const paletteIsFull = colors.length >= maxColors;
  return (
    <div className={classes.root}>
      {/* <PaletteFormNav
        open={open}
        palettes={palettes}
        handleSubmit={this.handleSubmit}
        handleDrawerOpen={setOpen(true)}
      /> */}
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
          {/* <ColorPickerForm
            paletteIsFull={paletteIsFull}
            addNewColor={this.addNewColor}
            colors={colors}
          /> */}
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {/* <DraggableColorList
          colors={colors}
          removeColor={this.removeColor}
          axis="xy"
          onSortEnd={this.onSortEnd}
          distance={20}
        /> */}
      </main>
    </div>
  );
}
