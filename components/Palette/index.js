import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import ColorBox from '../ColorBox';
import { PaletteStyles } from './PaletteStyles';
import NavBar from '../NavBar';
import PaletteFooter from '../PaletteFooter';

const useStyles = makeStyles(PaletteStyles);

export default function Palette({ palette, props }) {
  const classes = useStyles();
  const { colors, palatteName, emoji, id } = palette;
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState('hex');

  const colorBoxes = colors[level].map(color => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      showingFullPalette
    />
  ));

  return (
    <div className={classes.Palette}>
      <NavBar
        level={level}
        setLevel={setLevel}
        format={format}
        setFormat={setFormat}
        showingAllColors
      />
      <div className={classes.colors}>{colorBoxes}</div>
      <PaletteFooter palatteName={palatteName} emoji={emoji} />
    </div>
  );
}

Palette.propTypes = {
  palette: PropTypes.object.isRequired,
};
