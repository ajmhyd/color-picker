import { useRouter } from 'next/router';
import Palette from '../../../components/Palette';
import { generatePalette } from '../../../src/colorHelpers';
import seedColors from '../../../src/seedColors';

export default function paletteIdPage() {
  const router = useRouter();
  const { paletteId } = router.query;
  const findPalette = id => seedColors.find(palette => palette.id === id);
  return <Palette palette={generatePalette(findPalette(paletteId))} />;
}

paletteIdPage.getInitialProps = async () => ({});
