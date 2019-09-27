import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Link from 'next/link';
import Navbar from '../NavBar';
import ColorBox from '../ColorBox';
import PaletteFooter from '../PaletteFooter';
import { PaletteStyles } from '../Palette/PaletteStyles';

const useStyles = makeStyles(PaletteStyles);

export default function SingleColorPalette({ palette, colorId }) {
  const classes = useStyles();
  const [format, setFormat] = useState('hex');
  const { paletteName, emoji, id } = palette;
  const gatherShades = () => {
    let shades = [];
    const allColors = palette.colors;

    for (const key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorId)
      );
    }
    return shades.slice(1);
  };

  const colorBoxes = gatherShades().map(color => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showingFullPalette={false}
    />
  ));
  return (
    <div className={classes.Palette}>
      <Navbar setFormat={setFormat} showingAllColors={false} format={format} />
      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link href={`/palette/${id}`}>
            <a>GO BACK</a>
          </Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

SingleColorPalette.propTypes = {
  palette: PropTypes.object.isRequired,
  colorId: PropTypes.string.isRequired,
};
