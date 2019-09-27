import { useRouter } from 'next/router';
import SingleColorPalette from '../../../components/SingleColorPalette';
import { generatePalette } from '../../../src/colorHelpers';
import seedColors from '../../../src/seedColors';

export default function color() {
  const router = useRouter();
  const { paletteId, colorId } = router.query;
  const findPalette = id => seedColors.find(palette => palette.id === id);
  return (
    <SingleColorPalette
      palette={generatePalette(findPalette(paletteId))}
      colorId={colorId}
    />
  );
}

color.getInitialProps = async () => ({});
