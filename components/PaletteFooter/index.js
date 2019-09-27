import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { PaletteFooterStyles } from './PaletteFooterStyles';

const useStyles = makeStyles(PaletteFooterStyles);

export default function PaletteFooter({ paletteName, emoji }) {
  const classes = useStyles();
  return (
    <footer className={classes.PaletteFooter}>
      {paletteName}
      <span className={classes.emoji}>{emoji}</span>
    </footer>
  );
}

PaletteFooter.propTypes = {
  paletteName: PropTypes.string,
  emoji: PropTypes.string.isRequired,
};
