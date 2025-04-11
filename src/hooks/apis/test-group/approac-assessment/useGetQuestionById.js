import { useQuery } from "@tanstack/react-query";
import { getQuestionById } from "@/apis/test-group/approach-assessment";
import { useAuth } from "@/hooks/context/uesAuth";

export const useGetQuestionById = (id) => {
  const { auth, logout } = useAuth();

  const {
    isFetching,
    isLoading,
    isError,
    isSuccess,
    error,
    data: approachQuestionDataById,
  } = useQuery({
    queryFn: () => getQuestionById({ token: auth?.token, logout, id }),
    queryKey: ["approachQuestionById"],
  });

  return {
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
    approachQuestionDataById,
  };
};
