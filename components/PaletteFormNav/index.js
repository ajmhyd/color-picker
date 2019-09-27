import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import clsx from 'clsx';
import {
  AppBar,
  Button,
  IconButton,
  CssBaseline,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AddToPhotos } from '@material-ui/icons';
import PropTypes from 'prop-types';
import PaletteMetaForm from '../PaletteMetaForm';
import { PaletteFormNavStyles } from './PaletteFormNavStyles';

const useStyles = makeStyles(PaletteFormNavStyles);

export default function PaletteFormNav({
  open,
  palettes,
  setOpen,
  handleSubmit,
}) {
  const classes = useStyles();
  const [formShowing, setFormShowing] = useState(false);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={setOpen(true)}
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <AddToPhotos />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link href="/">
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              Go Back
            </Button>
          </Link>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setFormShowing(true)}
            className={classes.button}
          >
            Save
          </Button>
        </div>
      </AppBar>
      {formShowing && (
        <PaletteMetaForm
          palettes={palettes}
          handleSubmit={handleSubmit}
          hideForm={setFormShowing(false)}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

PaletteFormNav.propTypes = {
  open: PropTypes.bool.isRequired,
  palettes: PropTypes.array.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
