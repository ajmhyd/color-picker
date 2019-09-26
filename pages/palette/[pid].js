import { useRouter } from 'next/router';
import App from '../../components/App';

export default function pidApp() {
  const router = useRouter();
  const { pid } = router.query;
  return <App pid={pid} />;
}

pidApp.getInitialProps = async () => ({});
