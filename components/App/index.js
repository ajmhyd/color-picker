import React from 'react';
import Palette from '../Palette';
import seedColors from '../../seedColors';
import { generatePalette } from '../../src/colorHelpers';

export default function App({ pid }) {
  const findPalette = id => seedColors.find(palette => palette.id === id);

  return <Palette palette={generatePalette(findPalette(pid))} />;
}
