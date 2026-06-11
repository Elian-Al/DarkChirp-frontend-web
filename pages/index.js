import Login from "../components/login";
import { useRouter } from "next/router";
import useAuthStore from "../stores/authStore";

function Index() {
  // const user = useAuthStore((state) => state);
  // const router = useRouter();

  // if (user.isAuthenticated) {
  //   router.push('/Home');
  // };

  return <Login />;
}

export default Index;
