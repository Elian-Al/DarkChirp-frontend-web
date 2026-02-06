import Hashtag from '../../components/Hashtag';
import { useRouter } from 'next/router';

function hashtagPage() {
  const router = useRouter();
  const  { tag }  = router.query;
  
  return <Hashtag name={tag} />;
}

export default hashtagPage;
