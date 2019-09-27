import PaletteList from '../components/PaletteList';
import seedColors from '../src/seedColors';

export default function index() {
  return <PaletteList palettes={seedColors} />;
}
