import { useRouter } from "next/router";
import { useAuth } from "@/hooks/context/uesAuth";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  const router = useRouter();

//   if (auth.isLoading) {
//     return <div>Loading...</div>;
//   }

  if (!auth.token) {
    router.push("/");
    return null;
  }

  return children;
};

export default ProtectedRoute;
