import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Delete } from '@material-ui/icons';
import PropTypes from 'prop-types';
import { MiniPaletteStyles } from './MiniPaletteStyles';

const useStyles = makeStyles(MiniPaletteStyles);

export default function MiniPalette({
  paletteName,
  emoji,
  colors,
  id,
  openDialog,
  goToPalette,
}) {
  const classes = useStyles();

  const deletePalette = e => {
    e.stopPropagation();
    openDialog(id);
  };

  const handleClick = () => {
    goToPalette(id);
  };

  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
      key={color.name}
    />
  ));

  return (
    <div
      className={classes.root}
      onClick={handleClick}
      onKeyDown={handleClick}
      role="button"
      tabIndex={0}
    >
      <Delete
        className={classes.deleteIcon}
        style={{ transition: 'all 0.3s ease-in-out' }}
        onClick={e => deletePalette(e)}
      />

      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div>
  );
}

MiniPalette.propTypes = {
  paletteName: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  openDialog: PropTypes.func.isRequired,
  goToPalette: PropTypes.func.isRequired,
};
