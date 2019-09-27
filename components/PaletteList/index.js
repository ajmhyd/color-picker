import React, { useState } from 'react';
import Router from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  Avatar,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';
import { Check, Close } from '@material-ui/icons';
import { blue, red } from '@material-ui/core/colors';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { PaletteListStyles } from './PaletteListStyles';
import MiniPalette from '../MiniPalette';

const useStyles = makeStyles(PaletteListStyles);

export default function PaletteList({ palettes, deletePalette }) {
  const classes = useStyles();

  const [deletingId, setDeletingId] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const openDialog = id => {
    setOpenDeleteDialog(true);
    setDeletingId(id);
  };

  const closeDialog = () => {
    setOpenDeleteDialog(false);
    setDeletingId('');
  };

  const goToPalette = id => {
    Router.push(`/palette/${id}`);
  };

  const handleDelete = () => {
    deletePalette(deletingId);
    closeDialog();
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <nav className={classes.nav}>
          <h1 className={classes.heading}>Color Picker</h1>
          <Link href="/palette/newPalette">
            <a>Create Palette</a>
          </Link>
        </nav>
        <TransitionGroup className={classes.palettes}>
          {palettes.map(palette => (
            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
              <MiniPalette
                {...palette}
                goToPalette={() => goToPalette(palette.id)}
                openDialog={() => openDialog(palette.id)}
                key={palette.id}
                id={palette.id}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Dialog
        open={openDeleteDialog}
        aria-labelledby="delete-dialog-title"
        onClose={closeDialog}
      >
        <DialogTitle id="delete-dialog-title">Delete This Palette?</DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <Check />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <Close />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel" />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

PaletteList.propTypes = {
  palettes: PropTypes.array.isRequired,
  deletePalette: PropTypes.func,
};
