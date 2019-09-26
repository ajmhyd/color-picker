import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  PaletteFooter: {
    backgroundColor: 'white',
    height: '5vh',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: '1.5rem',
    margin: '0 1rem',
  },
});

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
